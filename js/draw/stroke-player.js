let fontPromise = null;
let currentFontUrl = null;

export async function playStrokeAnimation(glyph, strokes, opts = {}) {
  const {
    canvas,
    fontUrl,
    fontSize = 280,
    x = 80,
    y = 300,
    guideAlpha = 0.22,
    lineWidth = 18,
    glowBlur = 18,
    durationMs = 3000,  // time for ONE stroke reveal
    tailLen = 10,
    pauseMs = 120       // 👈 pause between strokes, Faster transitions: pauseMs: 120, More “breathing room”: pauseMs: 350
  } = opts;

  if (!canvas || !glyph || !strokes?.length) return;
  const ctx = canvas.getContext("2d");

  if (!fontPromise) fontPromise = opentype.load(fontUrl);
  const font = await fontPromise;

  const path = getFittedCenteredGlyphPath(font, glyph, canvas, fontSize, 28);
  const guide = new Path2D(path.toPathData(2));

  // cancel previous animation on this canvas
  if (canvas._cancelAnim) canvas._cancelAnim();

  let strokeIndex = 0;
  let t = 0;
  let last = null;

  // pause state
  let pausing = false;
  let pauseStart = null;

  let running = true;
  canvas._cancelAnim = () => (running = false);

  function drawGuide() {
    ctx.globalAlpha = guideAlpha;
    ctx.fillStyle = "white";
    ctx.shadowBlur = 0;
    ctx.fill(guide);
    ctx.globalAlpha = 1;
  }

  function drawPartial(points, n, glow = false) {
    if (!points || points.length < 2) return;

    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.shadowBlur = glow ? glowBlur : 0;
    ctx.shadowColor = "rgba(255,255,255,.95)";
    ctx.strokeStyle = glow ? "#fff" : "rgba(255,255,255,.95)";

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < n; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.stroke();
  }

  function redrawBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGuide();

    // draw all completed strokes fully
    for (let i = 0; i < strokeIndex; i++) {
      const s = strokes[i];
      drawPartial(s, s.length, false);
    }
  }

  function frame(now) {
    if (!running) return;

    // if we've finished all strokes, stop cleanly
    if (strokeIndex >= strokes.length) return;

    // PAUSE BETWEEN STROKES
    if (pausing) {
      if (pauseStart == null) pauseStart = now;

      redrawBase(); // show completed strokes + guide during pause

      if (now - pauseStart >= pauseMs) {
        // end pause → advance to next stroke
        pausing = false;
        pauseStart = null;
        t = 0;
        last = null;
      }

      requestAnimationFrame(frame);
      return;
    }

    // normal stroke reveal
    if (last == null) last = now;
    const dt = now - last;
    last = now;

    t += dt / durationMs;
    if (t > 1) t = 1;

    redrawBase();

    const cur = strokes[strokeIndex];
    const n = Math.max(2, Math.floor(t * cur.length));

    drawPartial(cur, n, false);

    const tail = cur.slice(Math.max(0, n - tailLen), n);
    if (tail.length > 1) drawPartial(tail, tail.length, true);

    // end of current stroke → enter pause OR finish
    if (t >= 1) {
      strokeIndex++;

      // if more strokes remain, pause before starting next
      if (strokeIndex < strokes.length) {
        pausing = true;
        pauseStart = null;
      }

      t = 0;
      last = null;
    }

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

export async function drawGuideGlyph(glyph, opts = {}) {
  const {
    canvas,
    fontUrl,
    fontSize = 280,
    guideAlpha = 0.22
  } = opts;

  if (!canvas || !glyph) return;
  const ctx = canvas.getContext("2d");

  if (!fontPromise) fontPromise = opentype.load(fontUrl);
  const font = await fontPromise;

  const path = getFittedCenteredGlyphPath(font, glyph, canvas, fontSize, 28);
  const guide = new Path2D(path.toPathData(2));

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = guideAlpha;
  ctx.fillStyle = "white";
  ctx.shadowBlur = 0;
  ctx.fill(guide);
  ctx.globalAlpha = 1;
}

function getFittedCenteredGlyphPath(font, glyph, canvas, baseFontSize, pad = 28){
  // 1) measure at base size
  let path = font.getPath(glyph, 0, 0, baseFontSize);
  let box  = path.getBoundingBox();

  let w = box.x2 - box.x1;
  let h = box.y2 - box.y1;

  // 2) scale down if it doesn't fit (with padding)
  const maxW = canvas.width  - pad * 2;
  const maxH = canvas.height - pad * 2;
  const scale = Math.min(1, maxW / w, maxH / h);

  const fontSize = baseFontSize * scale;

  // 3) re-measure at final size
  path = font.getPath(glyph, 0, 0, fontSize);
  box  = path.getBoundingBox();
  w = box.x2 - box.x1;
  h = box.y2 - box.y1;

  // 4) center using bbox (with padding already respected by scale)
  const x = (canvas.width  - w) / 2 - box.x1;
  const y = (canvas.height + h) / 2 - box.y2;

  return font.getPath(glyph, x, y, fontSize);
}