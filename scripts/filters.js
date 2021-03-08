function invalidDataFilter(patient) {
  return patient.ugis != "?" && patient.ugis != "";
}

function sexFilter(patient) {
  return patient.lytis == this;
}

module.exports = { invalidDataFilter, sexFilter };
