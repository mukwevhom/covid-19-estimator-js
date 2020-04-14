const covid19ImpactEstimator = (data) => {

  let impact = {};
  let severeImpact = {};
  let factor = 0;
  let days = 0;

  if (data.periodType === 'months') {
    const monthsToDays = data.timeToElapse * 30;
    days = monthsToDays;

    factor = Math.floor(monthsToDays / 3);
  } else if (data.periodType === 'weeks') {
    const weeksToDays = data.timeToElapse * 7;
    days = weeksToDays;

    factor = Math.floor(weeksToDays / 3);
  } else {
    days = data.timeToElapse;
    factor = Math.floor(data.timeToElapse / 3);
  }

  impact.currentlyInfected = data.reportedCases * 10;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  impact.severeCasesByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = Math.floor((data.totalHospitalBeds * 0.35) - impact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.05);
  impact.casesForVentilatorsByRequestedTime = Math.floor(impact.infectionsByRequestedTime * 0.02);
  impact.dollarsInFlight = Math.floor((impact.infectionsByRequestedTime * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation) / days);

  severeImpact.currentlyInfected = data.reportedCases * 50;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);
  severeImpact.severeCasesByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.15);
  severeImpact.hospitalBedsByRequestedTime = Math.floor((data.totalHospitalBeds * 0.35) - severeImpact.severeCasesByRequestedTime);
  severeImpact.casesForICUByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.05);
  severeImpact.casesForVentilatorsByRequestedTime = Math.floor(severeImpact.infectionsByRequestedTime * 0.02);
  severeImpact.dollarsInFlight = Math.floor((severeImpact.infectionsByRequestedTime * data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation) / days);

  return {data, impact, severeImpact};
};

export default covid19ImpactEstimator;
