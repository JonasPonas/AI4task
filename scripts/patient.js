class Patient {
  constructor(idobject, pacientas, karsciavimas, kosulys, nuovargis, sunkumas, skausmas, judesiai, galva, konjutivytas, viduriavimas, gerkle, klasteris) {
    this.idobject = idobject;
    this.pacientas = pacientas;
    this.karsciavimas = karsciavimas;
    this.kosulys = kosulys;
    this.nuovargis = nuovargis;
    this.sunkumas = sunkumas;
    this.skausmas = skausmas;
    this.judesiai = judesiai;
    this.kosulys = kosulys;
    this.galva = galva;
    this.konjutivytas = konjutivytas;
    this.viduriavimas = viduriavimas;
    this.gerkle = gerkle;
    this.klasteris = null;
  }
}

module.exports = Patient;
