(function () {
  var ES = (document.documentElement.lang || "en").slice(0, 2) === "es";
  var SVGNS = "http://www.w3.org/2000/svg";

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function svg(tag, attrs) {
    var node = document.createElementNS(SVGNS, tag);
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) node.setAttribute(k, attrs[k]);
    }
    return node;
  }

  /* ---------------- Four steps, each with its exit ---------------- */

  var STEPS = ES
    ? [
        {
          n: "Paso 01",
          name: "¿Hay tracción real?",
          lookLabel: "Qué miramos",
          look:
            "Si la demanda le pertenece a la marca o a un solo producto con un empujón detrás. Una línea que la gente pide por nombre se puede llevar. Un momento de un solo producto, no.",
          exitLabel: "Cuándo nos retiramos",
          exit:
            "Si la marca es un solo artículo y el fabricante ya lo vende él mismo, no hay línea que un retailer pueda llevar. No escribimos."
        },
        {
          n: "Paso 02",
          name: "Quién lo está vendiendo de verdad",
          lookLabel: "Qué miramos",
          look:
            "La diferencia entre los socios que aprobaste y las cuentas que simplemente aparecieron. Nombres, no conteos: por fuera, un distribuidor autorizado y un ocupante se ven idénticos hasta que lees el papel.",
          exitLabel: "Cuándo nos retiramos",
          exit:
            "Si no logramos distinguir a tus socios de tus ocupantes, te preguntamos antes de pedirte nada. Un pitch construido sobre una suposición no le sirve a ninguno de los dos."
        },
        {
          n: "Paso 03",
          name: "¿Alguien domina la categoría?",
          lookLabel: "Qué miramos",
          look:
            "Si las ventas están en manos de un solo revendedor que nunca aprobaste. La concentración no es competencia: es un peaje, y lo pagan todos los demás.",
          exitLabel: "Cuándo nos retiramos",
          exit:
            "Si un revendedor no autorizado domina la categoría, nos vamos. Sumar ahí una puerta autorizada no lo diluye. Lo financia."
        },
        {
          n: "Paso 04",
          name: "¿Otra puerta ayudaría de verdad?",
          lookLabel: "Qué miramos",
          look:
            "Si tus puertas autorizadas actuales ya alcanzan al comprador, o si hay un comprador que ninguna de ellas está colocada para servir.",
          exitLabel: "Cuándo nos retiramos",
          exit:
            "Si tu lista ya cubre a ese comprador, una puerta más es ruido. Te lo diríamos en el primer correo, y preferimos perder la cuenta antes que venderte saturación."
        }
      ]
    : [
        {
          n: "Step 01",
          name: "Is there real pull?",
          lookLabel: "What we look at",
          look:
            "Whether the demand belongs to the brand or to a single product with a push behind it. A line people ask for by name can be carried. A one-product moment cannot.",
          exitLabel: "When we walk away",
          exit:
            "If the brand is one item and the maker already sells it themselves, there is nothing for a retailer to carry. We don't write."
        },
        {
          n: "Step 02",
          name: "Who is actually selling it",
          lookLabel: "What we look at",
          look:
            "The difference between the partners you approved and the accounts that simply appeared. Names, not counts — from the outside, an authorized distributor and a squatter look identical until you read the paper.",
          exitLabel: "When we walk away",
          exit:
            "If we cannot tell your partners from your squatters, we ask you before we ask you for anything. A pitch built on a guess is worth nothing to either of us."
        },
        {
          n: "Step 03",
          name: "Is anyone holding the category?",
          lookLabel: "What we look at",
          look:
            "Whether the sales sit with one reseller you never approved. Concentration is not competition — it is a toll gate, and everyone else pays it.",
          exitLabel: "When we walk away",
          exit:
            "If one unauthorized reseller holds the category, we walk. Adding an authorized door there does not dilute them. It funds them."
        },
        {
          n: "Step 04",
          name: "Would another door actually help?",
          lookLabel: "What we look at",
          look:
            "Whether your existing authorized doors already reach the buyer, or whether there is a buyer none of them is placed to serve.",
          exitLabel: "When we walk away",
          exit:
            "If your roster already covers that buyer, one more door is noise. We would say so in the first email, and we would rather lose the account than sell you crowding."
        }
      ];

  var stepsShell = document.querySelector("[data-steps]");
  if (stepsShell) {
    var current = 0;

    var rail = el("div", "steps-rail");
    var panel = el("div", "steps-panel");

    function paint(focus) {
      rail.textContent = "";
      STEPS.forEach(function (s, i) {
        var b = el("button", "step-pick");
        b.type = "button";
        if (i === current) b.className += " is-open";
        b.appendChild(el("span", "step-n", s.n));
        b.appendChild(el("span", "step-name", s.name));
        b.addEventListener("click", function () {
          current = i;
          paint(true);
        });
        rail.appendChild(b);
      });

      panel.textContent = "";
      var s = STEPS[current];
      var h = el("h3", "step-title", s.name);
      h.tabIndex = -1;
      panel.appendChild(h);
      panel.appendChild(el("p", "step-label", s.lookLabel));
      panel.appendChild(el("p", "step-body", s.look));
      var exitWrap = el("div", "step-exit");
      exitWrap.appendChild(el("p", "step-label step-label-exit", s.exitLabel));
      exitWrap.appendChild(el("p", "step-body", s.exit));
      panel.appendChild(exitWrap);
      if (focus) h.focus({ preventScroll: true });
    }

    stepsShell.appendChild(rail);
    stepsShell.appendChild(panel);
    paint(false);
  }

  /* ---------------- Where demand lands ---------------- */

  var doorsShell = document.querySelector("[data-doors]");
  if (!doorsShell) return;

  var D = ES
    ? {
        demand: "Demanda por tu marca",
        wall: "Tu lista de autorizados · aquí sostiene el MAP",
        grey: "Mercado gris",
        door: "Puerta",
        add: "Sumar puerta",
        remove: "Quitar puerta",
        count: function (n) {
          return n === 1 ? "1 puerta autorizada" : n + " puertas autorizadas";
        },
        leak:
          "La demanda no espera. Lo que tus puertas autorizadas no pueden recibir no desaparece: aterriza donde tú no aprobaste.",
        held:
          "Esto no promete volumen. Es la forma del argumento: la demanda que tiene dónde aterrizar de forma autorizada se queda dentro de tu muro."
      }
    : {
        demand: "Demand for your brand",
        wall: "Your authorized roster · MAP holds here",
        grey: "Grey market",
        door: "Door",
        add: "Add a door",
        remove: "Remove a door",
        count: function (n) {
          return n === 1 ? "1 authorized door" : n + " authorized doors";
        },
        leak:
          "Demand does not wait. What your authorized doors cannot receive does not disappear — it lands where you never approved.",
        held:
          "Nothing here promises volume. It is the shape of the argument: demand with an authorized place to land stays inside your wall."
      };

  var MARKS = 8;
  var PER_DOOR = 2;
  var doors = 1;

  function narrow() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  var legend = el("div", "doors-legend");
  [
    { cls: "key-demand", text: D.demand },
    { cls: "key-wall", text: D.wall },
    { cls: "key-grey", text: D.grey }
  ].forEach(function (k) {
    var item = el("p", "doors-key");
    item.appendChild(el("span", "doors-swatch " + k.cls));
    item.appendChild(el("span", null, k.text));
    legend.appendChild(item);
  });

  var stage = el("div", "doors-stage");
  var caption = el("p", "doors-caption");
  caption.setAttribute("aria-live", "polite");

  var controls = el("div", "doors-controls");
  var less = el("button", "doors-btn", "\u2212");
  less.type = "button";
  less.setAttribute("aria-label", D.remove);
  var more = el("button", "doors-btn", "+");
  more.type = "button";
  more.setAttribute("aria-label", D.add);
  var readout = el("span", "doors-readout");

  function draw() {
    stage.textContent = "";
    var s = svg("svg", {
      viewBox: "0 0 800 460",
      class: "doors-svg",
      role: "img",
      "aria-label": D.count(doors)
    });

    s.appendChild(
      svg("rect", { x: 40, y: 170, width: 520, height: 230, rx: 2, class: "doors-wall" })
    );
    s.appendChild(
      svg("rect", { x: 610, y: 170, width: 150, height: 230, rx: 2, class: "doors-grey" })
    );

    var slotW = 520 / doors;
    var doorX = [];
    for (var d = 0; d < doors; d++) {
      var cx = 40 + slotW * d + slotW / 2;
      doorX.push(cx);
      var w = Math.min(120, slotW - 24);
      s.appendChild(
        svg("rect", { x: cx - w / 2, y: 300, width: w, height: 62, rx: 2, class: "doors-door" })
      );
      var dt = svg("text", { x: cx, y: 337, class: "doors-dt", "text-anchor": "middle" });
      dt.textContent = narrow() ? String(d + 1) : D.door + " " + (d + 1);
      s.appendChild(dt);
    }

    var greySpot = [
      [650, 250],
      [722, 250],
      [650, 305],
      [722, 305],
      [650, 360],
      [722, 360]
    ];

    var capacity = doors * PER_DOOR;
    var greyIx = 0;
    for (var i = 0; i < MARKS; i++) {
      var mx = 70 + i * 84;
      var inside = i < capacity;
      var tx;
      var ty;

      if (inside) {
        tx = doorX[Math.floor(i / PER_DOOR)];
        ty = 300;
      } else {
        var spot = greySpot[Math.min(greyIx, greySpot.length - 1)];
        greyIx++;
        tx = spot[0];
        ty = spot[1];
        s.appendChild(svg("circle", { cx: tx, cy: ty, r: 6, class: "doors-landed" }));
      }

      var path = svg("path", {
        d: "M " + mx + " 66 C " + mx + " 180, " + tx + " 190, " + tx + " " + ty,
        class: inside ? "doors-flow" : "doors-flow doors-flow-grey"
      });
      path.style.animationDelay = i * 45 + "ms";
      s.appendChild(path);
      s.appendChild(svg("circle", { cx: mx, cy: 58, r: 5, class: "doors-mark" }));
    }

    stage.appendChild(s);
    caption.textContent = capacity >= MARKS ? D.held : D.leak;
    readout.textContent = D.count(doors);
    less.disabled = doors <= 1;
    more.disabled = doors >= MARKS / PER_DOOR;
  }

  less.addEventListener("click", function () {
    if (doors > 1) {
      doors--;
      draw();
    }
  });
  more.addEventListener("click", function () {
    if (doors < MARKS / PER_DOOR) {
      doors++;
      draw();
    }
  });

  controls.appendChild(less);
  controls.appendChild(readout);
  controls.appendChild(more);

  doorsShell.appendChild(legend);
  doorsShell.appendChild(stage);
  doorsShell.appendChild(controls);
  doorsShell.appendChild(caption);
  draw();

  var wasNarrow = narrow();
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (narrow() !== wasNarrow) {
        wasNarrow = narrow();
        draw();
      }
    }, 180);
  });
})();
