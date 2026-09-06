(function () {
  var shell = document.querySelector("[data-diag]");
  if (!shell) return;

  var ES = (document.documentElement.lang || "en").slice(0, 2) === "es";

  var COPY = ES
    ? {
        step: "Pregunta",
        of: "de",
        back: "Anterior",
        restart: "Empezar de nuevo",
        seeLabel: "Lo que puedes ver",
        actLabel: "Sobre lo que puedes actuar",
        readLabel: "Tu lectura",
        doorLabel: "Qué haría una puerta autorizada más",
        closing:
          "Estas seis preguntas son las mismas que nos hacemos nosotros antes de escribirle a una marca. Si alguna te incomodó, esa es la que importa.",
        mail: "Contact.us@globanzer.com"
      }
    : {
        step: "Question",
        of: "of",
        back: "Back",
        restart: "Start over",
        seeLabel: "What you can see",
        actLabel: "What you can act on",
        readLabel: "Your read",
        doorLabel: "What one more authorized door would do",
        closing:
          "These six are the same questions we put to ourselves before we write to a brand. If one of them stung, that is the one that matters.",
        mail: "Contact.us@globanzer.com"
      };

  var QUESTIONS = ES
    ? [
        {
          q: "Ahora mismo, ¿cuántos vendedores hay en tus listados que nunca autorizaste?",
          a: [
            { t: "Ninguno que sepamos", v: 1, c: 2 },
            { t: "Unos pocos — podríamos nombrarlos", v: 2, c: 1 },
            { t: "Más de los que podemos seguir", v: 2, c: 0 },
            { t: "No lo medimos", v: 0, c: 0 }
          ]
        },
        {
          q: "Tu política de precio mínimo anunciado es —",
          a: [
            { t: "Publicada, y hemos sacado revendedores por incumplirla", v: 2, c: 2 },
            { t: "Publicada, pero casi nunca se hace cumplir", v: 1, c: 1 },
            { t: "Informal — se maneja conversación por conversación", v: 1, c: 0 },
            { t: "No tenemos", v: 0, c: 0 }
          ]
        },
        {
          q: "En tu línea más vendida en internet, ¿quién hace la mayoría de las ventas?",
          a: [
            { t: "Nosotros, o nuestra propia tienda", v: 2, c: 2 },
            { t: "Un socio autorizado que aprobamos", v: 2, c: 2 },
            { t: "Alguien que nunca aprobamos", v: 2, c: 0 },
            { t: "No lo sabemos", v: 0, c: 0 }
          ]
        },
        {
          q: "Cuando un distribuidor mueve tu producto a un revendedor que nunca aprobaste, te enteras —",
          a: [
            { t: "Rápido, y se detiene", v: 2, c: 2 },
            { t: "Tarde, pero nos enteramos", v: 1, c: 1 },
            { t: "Cuando un cliente reclama o pide garantía", v: 1, c: 0 },
            { t: "No nos enteraríamos", v: 0, c: 0 }
          ]
        },
        {
          q: "Tu producto número uno en internet y tu número uno en tienda física son —",
          a: [
            { t: "Distintos, y sabemos cuál es cuál", v: 2, c: 1 },
            { t: "El mismo, y lo hemos verificado", v: 2, c: 1 },
            { t: "Parecidos, suponemos", v: 1, c: 0 },
            { t: "No lo hemos mirado así", v: 0, c: 0 }
          ]
        },
        {
          q: "Puertas retail autorizadas que llevan tu línea en internet hoy:",
          a: [
            { t: "Una — o solo nosotros", v: 2, c: 2 },
            { t: "Dos o tres que aprobamos", v: 2, c: 1 },
            { t: "Más de las que seguimos", v: 1, c: 0 },
            { t: "Ninguna — internet es donde vive el mercado gris", v: 1, c: 0 }
          ]
        }
      ]
    : [
        {
          q: "Right now, how many sellers sit on your listings that you never authorized?",
          a: [
            { t: "None that we know of", v: 1, c: 2 },
            { t: "A handful — we could name them", v: 2, c: 1 },
            { t: "More than we can keep up with", v: 2, c: 0 },
            { t: "We don't track that", v: 0, c: 0 }
          ]
        },
        {
          q: "Your minimum advertised price policy is —",
          a: [
            { t: "Published, and we have removed resellers for breaking it", v: 2, c: 2 },
            { t: "Published, but rarely enforced", v: 1, c: 1 },
            { t: "Informal — handled conversation by conversation", v: 1, c: 0 },
            { t: "We don't have one", v: 0, c: 0 }
          ]
        },
        {
          q: "On your best-selling line online, who makes most of the sales?",
          a: [
            { t: "Us, or our own store", v: 2, c: 2 },
            { t: "An authorized partner we approved", v: 2, c: 2 },
            { t: "Someone we never approved", v: 2, c: 0 },
            { t: "We don't know", v: 0, c: 0 }
          ]
        },
        {
          q: "When a distributor moves your product to a reseller you never approved, you find out —",
          a: [
            { t: "Quickly, and it stops", v: 2, c: 2 },
            { t: "Late, but we find out", v: 1, c: 1 },
            { t: "When a customer complains or claims a warranty", v: 1, c: 0 },
            { t: "We wouldn't find out", v: 0, c: 0 }
          ]
        },
        {
          q: "Your number one product online and your number one at retail are —",
          a: [
            { t: "Different, and we know which is which", v: 2, c: 1 },
            { t: "The same, and we have checked", v: 2, c: 1 },
            { t: "Roughly the same, we assume", v: 1, c: 0 },
            { t: "We haven't looked at it that way", v: 0, c: 0 }
          ]
        },
        {
          q: "Authorized retail doors carrying your line online today:",
          a: [
            { t: "One — or only us", v: 2, c: 2 },
            { t: "Two or three we approved", v: 2, c: 1 },
            { t: "More than we track", v: 1, c: 0 },
            { t: "None — online is where the grey market lives", v: 1, c: 0 }
          ]
        }
      ];

  var PROFILES = ES
    ? {
        held: {
          t: "Una casa cerrada",
          r: "Ves tu canal y puedes actuar sobre él. Eso es más raro de lo que la industria admite. Nada en esta página es un rescate para una marca en tu posición.",
          d: "Una puerta autorizada más solo se gana su lugar si alcanza a un comprador que tus puertas actuales no alcanzan. Si no lo hace, la respuesta honesta es no — y te lo diríamos en el primer correo."
        },
        paper: {
          t: "Vista, pero no sostenida",
          r: "Sabes lo que pasa en tu canal. Lo que falta es la palanca: la política existe, pero la consecuencia no llega lo bastante rápido como para cambiarle la conducta a nadie.",
          d: "Una puerta autorizada más no arregla el cumplimiento. Lo que hace es darle a la demanda un lugar legítimo donde aterrizar mientras aprietas la política — para que la venta no caiga por defecto en el más barato y el menos responsable."
        },
        habit: {
          t: "Sostenida por costumbre",
          r: "Tus términos se respetan, pero sobre todo porque la gente a tu alrededor ha sido leal, no porque puedas ver qué ocurre después de que sale la paleta. La lealtad no es un control.",
          d: "Antes de que valga la pena hablar de otra puerta, querrías tener visibilidad de tus propios listados. Cualquiera que te diga lo contrario te está vendiendo algo."
        },
        blind: {
          t: "El punto ciego",
          r: "El riesgo en el canal de una marca casi nunca es el revendedor que puedes nombrar. Son los que no puedes: las cuentas que aparecen después de que un distribuidor liquida inventario, venden bajo tu nombre, ponen precio por debajo de tu política y le entregan a tu cliente una garantía que tú nunca respaldaste.",
          d: "Una puerta autorizada más vale poco mientras no puedas ver el canal. Primero la vista, después los socios. Preferimos decírtelo ahora y no después de una orden de compra."
        },
        occupied: {
          t: "Ocupada",
          r: "Alguien que nunca aprobaste controla la venta de tu mejor línea, y hay más de los que puedes seguir. Eso no es un canal con un problema. Es un canal con un ocupante.",
          d: "Este es el caso en el que nos retiramos. Cuando un revendedor no autorizado domina una categoría, sumar una puerta autorizada no lo diluye: lo financia. No le escribimos a marcas en esta posición, y preferimos que lo leas aquí y no en un pitch."
        }
      }
    : {
        held: {
          t: "A closed house",
          r: "You can see your channel and you can act on it. That is rarer than the industry admits. Nothing on this page is a rescue pitch for a brand in your position.",
          d: "One more authorized retailer only earns its place if it reaches a buyer your current doors do not. If it does not, the honest answer is no — and we would say so in the first email."
        },
        paper: {
          t: "Seen, not held",
          r: "You know what is happening in your channel. What is missing is the lever: the policy exists, but the consequence does not arrive fast enough to change anyone's behaviour.",
          d: "One more authorized door does not fix enforcement. What it does is give the demand somewhere legitimate to land while you tighten the policy — so the sale does not default to whoever is cheapest and least accountable."
        },
        habit: {
          t: "Held by habit",
          r: "Your terms hold, but mostly because the people around you have been loyal, not because you can see what happens after the pallet leaves. Loyalty is not a control.",
          d: "Before another door is worth discussing, you would want sight of your own listings. Any partner who tells you otherwise is selling you something."
        },
        blind: {
          t: "The blind spot",
          r: "The risk in a brand's channel is almost never the reseller you can name. It is the ones you cannot — the accounts that appear after a distributor clears stock, sell under your name, price under your policy, and hand your customer a warranty you never underwrote.",
          d: "One more authorized door is worth little until you can see the channel. Sight first, then partners. We would rather say that now than after a purchase order."
        },
        occupied: {
          t: "Occupied",
          r: "Someone you never approved holds the sale on your best line, and there are more of them than you can keep up with. That is not a channel with a problem. That is a channel with an occupant.",
          d: "This is the case where we walk away. When one unauthorized reseller holds a category, adding an authorized door does not dilute them — it funds them. We do not write to brands in this position, and we would rather you read it here than hear it in a pitch."
        }
      };

  var TOTAL = QUESTIONS.length;
  var answers = [];
  var index = 0;

  function totals() {
    var v = 0;
    var c = 0;
    var max = 0;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] == null) continue;
      var pick = QUESTIONS[i].a[answers[i]];
      v += pick.v;
      c += pick.c;
      max += 2;
    }
    return { v: v, c: c, max: max };
  }

  function profile() {
    var t = totals();
    var occupied = answers[0] === 2 && answers[2] === 2;
    if (occupied) return PROFILES.occupied;
    var see = t.v / t.max;
    var act = t.c / t.max;
    if (see >= 0.65 && act >= 0.65) return PROFILES.held;
    if (see >= 0.65) return PROFILES.paper;
    if (act >= 0.55) return PROFILES.habit;
    return PROFILES.blind;
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function meters() {
    var t = totals();
    var wrap = el("div", "diag-meters");
    [
      { label: COPY.seeLabel, val: t.max ? t.v / t.max : 0 },
      { label: COPY.actLabel, val: t.max ? t.c / t.max : 0 }
    ].forEach(function (m) {
      var row = el("div", "diag-meter");
      row.appendChild(el("p", "diag-meter-label", m.label));
      var rail = el("div", "diag-meter-rail");
      var fill = el("span", "diag-meter-fill");
      fill.style.width = Math.round(m.val * 100) + "%";
      rail.appendChild(fill);
      row.appendChild(rail);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function rail() {
    var wrap = el("div", "diag-rail");
    for (var i = 0; i < TOTAL; i++) {
      var tick = el("span", "diag-tick");
      if (answers[i] != null) tick.className += " is-done";
      if (i === index && answers.length !== TOTAL) tick.className += " is-here";
      wrap.appendChild(tick);
    }
    return wrap;
  }

  function answered() {
    for (var i = 0; i < TOTAL; i++) if (answers[i] == null) return false;
    return true;
  }

  function render(focus) {
    shell.textContent = "";

    var aside = el("aside", "diag-aside");
    aside.appendChild(meters());
    aside.appendChild(rail());
    shell.appendChild(aside);

    var card = el("div", "diag-card");

    if (!answered()) {
      var q = QUESTIONS[index];
      card.appendChild(el("p", "diag-step", COPY.step + " " + (index + 1) + " " + COPY.of + " " + TOTAL));
      var heading = el("h3", "diag-q", q.q);
      heading.tabIndex = -1;
      card.appendChild(heading);

      var list = el("div", "diag-options");
      q.a.forEach(function (opt, i) {
        var btn = el("button", "diag-option", opt.t);
        btn.type = "button";
        if (answers[index] === i) btn.className += " is-picked";
        btn.addEventListener("click", function () {
          answers[index] = i;
          var next = index;
          while (next < TOTAL && answers[next] != null) next++;
          index = next < TOTAL ? next : index;
          render(true);
        });
        list.appendChild(btn);
      });
      card.appendChild(list);

      if (index > 0) {
        var back = el("button", "diag-back", "\u2190 " + COPY.back);
        back.type = "button";
        back.addEventListener("click", function () {
          index = index - 1;
          render(true);
        });
        card.appendChild(back);
      }
      shell.appendChild(card);
      if (focus) heading.focus({ preventScroll: true });
      return;
    }

    var p = profile();
    card.className = "diag-card diag-read";
    card.appendChild(el("p", "diag-step", COPY.readLabel));
    var title = el("h3", "diag-q", p.t);
    title.tabIndex = -1;
    card.appendChild(title);
    card.appendChild(el("p", "diag-body", p.r));
    card.appendChild(el("p", "diag-step diag-step-2", COPY.doorLabel));
    card.appendChild(el("p", "diag-body", p.d));
    card.appendChild(el("p", "diag-closing", COPY.closing));

    var mail = el("p", "diag-mail");
    var link = el("a", null, COPY.mail);
    link.href = "mailto:Contact.us@globanzer.com";
    mail.appendChild(link);
    card.appendChild(mail);

    var again = el("button", "diag-back", COPY.restart);
    again.type = "button";
    again.addEventListener("click", function () {
      answers = [];
      index = 0;
      render(true);
    });
    card.appendChild(again);

    shell.appendChild(card);
    if (focus) title.focus({ preventScroll: true });
  }

  render(false);
})();
