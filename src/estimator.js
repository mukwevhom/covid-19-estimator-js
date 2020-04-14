const covid19ImpactEstimator = (data) => {
  const {
    region, periodType, timeToElapse, reportedCases, totalHospitalBeds
  } = data;

  const {
    avgDailyIncomeInUSD, avgDailyIncomePopulation
  } = region;

  let impact = {};
  let severeImpact = {};
  let factor = 0;
  let days = 0;

  if (data.periodType === 'months') {
    const monthsToDays = timeToElapse * 30;
    days = monthsToDays;

    factor = Math.floor(monthsToDays / 3);
  } else if (periodType === 'weeks') {
    const weeksToDays = timeToElapse * 7;
    days = weeksToDays;

    factor = Math.floor(weeksToDays / 3);
  } else {
    days = timeToElapse;
    factor = Math.floor(timeToElapse / 3);
  }

  const iCurrentlyInfected = reportedCases * 10;
  const iInfectionsByRequestedTime = iCurrentlyInfected * (2 ** factor);
  const iSevereCasesByRequestedTime = Math.floor(iInfectionsByRequestedTime * 0.15);
  const iHospitalBedsByRequestedTime = Math.floor(
    (totalHospitalBeds * 0.35) - iSevereCasesByRequestedTime
  );
  const iCasesForICUByRequestedTime = Math.floor(iInfectionsByRequestedTime * 0.05);
  const iCasesForVentilatorsByRequestedTime = Math.floor(iInfectionsByRequestedTime * 0.02);
  const iDollarsInFlight = Math.floor(
    (iInfectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / days
  );

  impact = {
    iCurrentlyInfected,
    iInfectionsByRequestedTime,
    iSevereCasesByRequestedTime,
    iHospitalBedsByRequestedTime,
    iCasesForICUByRequestedTime,
    iCasesForVentilatorsByRequestedTime,
    iDollarsInFlight
  };

  const sICurrentlyInfected = reportedCases * 50;
  const sIInfectionsByRequestedTime = sICurrentlyInfected * (2 ** factor);
  const sISevereCasesByRequestedTime = Math.floor(sIInfectionsByRequestedTime * 0.15);
  const sIHospitalBedsByRequestedTime = Math.floor(
    (totalHospitalBeds * 0.35) - sISevereCasesByRequestedTime
  );
  const sIcasesForICUByRequestedTime = Math.floor(sIInfectionsByRequestedTime * 0.05);
  const sIcasesForVentilatorsByRequestedTime = Math.floor(sIInfectionsByRequestedTime * 0.02);
  const sIdollarsInFlight = Math.floor(
    (sIInfectionsByRequestedTime * avgDailyIncomeInUSD * avgDailyIncomePopulation) / days
  );

  severeImpact = {
    sICurrentlyInfected,
    sIInfectionsByRequestedTime,
    sISevereCasesByRequestedTime,
    sIHospitalBedsByRequestedTime,
    sIcasesForICUByRequestedTime,
    sIcasesForVentilatorsByRequestedTime,
    sIdollarsInFlight
  };

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
