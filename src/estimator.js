let data = {
	region: {
		name: 'Africa',
		avgAge: 19.7,
		avgDailyIncomeInUSD: 5,
		avgDailyIncomePopulation: 0.71
	},
	periodType: 'days',
	timeToElapse: 58,
	reportedCases: 674,
	population: 66622705,
	totalhospitalBeds: 1380614
};

const covid19ImpactEstimator = (data) => {
	let { region, periodType, timeToElapse, reportedCases, population, totalhospitalBeds } = data;

	let { name, avgAge, avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

	function getNormalizedTimeToElaspe(timeToElapse, periodType) {
		let normalizedTimeToElaspe = null;
		switch (periodType) {
			case 'days':
				normalizedTimeToElaspe = timeToElapse;
				return normalizedTimeToElaspe;
				break;
			case 'weeks':
				normalizedTimeToElaspe = timeToElapse * 7;
				return normalizedTimeToElaspe;
				break;
			case 'months':
				normalizedTimeToElaspe = timeToElapse * 30;
				return normalizedTimeToElaspe;
				break;
			default:
				return normalizedTimeToElaspe;
				break;
		}
	}

	timeToElapse = getNormalizedTimeToElaspe(timeToElapse, periodType);
	let no_of_available_beds = Math.trunc(totalHospitalBeds * 35 / 100);
	let impact = {};
	let severeImpact = {};
	// ** COMPUTATION FOR IMPACT STARTS
	impact.currentlyInfected = reportedCases * 10;
	impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * 2 ** (timeToElapse / 3));
	impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 15 / 100);
	impact.hospitalBedsByRequestedTime = no_of_available_beds - impact.severeCasesByRequestedTime;
	impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 5 / 100);
	impact.casesForVentilatorsByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 2 / 100);
	impact.dollarsInFlight = (impact.infectionsByRequestedTime *
		avgDailyIncomePopulation *
		avgDailyIncomeInUSD *
		timeToElapse).toFixed(2);

	// ** COMPUTATION FOR IMPACT ENDS

	// ** COMPUTATION FOR SEVEREIMPACT STARTS
	severeImpact.currentlyInfected = reportedCases * 50;
	severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * 2 ** (timeToElapse / 3));
	severeImpact.severeCasesByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 15 / 100);
	severeImpact.hospitalBedsByRequestedTime = no_of_available_beds - severeImpact.severeCasesByRequestedTime;
	severeImpact.casesForICUByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 5 / 100);
	severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(severeImpact.infectionsByRequestedTime * 2 / 100);
	severeImpact.dollarsInFlight = (severeImpact.infectionsByRequestedTime *
		avgDailyIncomePopulation *
		avgDailyIncomeInUSD *
		timeToElapse).toFixed(2);

	// ** COMPUTATION FOR SEVEREIMPACT ENDS
	return {
		data,
		impact,
		severeImpact
	};
};
covid19ImpactEstimator(data);
export default covid19ImpactEstimator;
