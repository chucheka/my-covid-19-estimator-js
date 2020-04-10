const data = {
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
	totalHospitalBeds: 1380614
};

const covid19ImpactEstimator = (data) => {
	const { region, periodType, reportedCases, totalHospitalBeds } = data;

	let { timeToElapse } = data;

	const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

	function getNormalizedTimeToElaspe(timeToElapse, periodType) {
		let normalizedTimeToElaspe = null;
		switch (periodType) {
			case 'days':
				normalizedTimeToElaspe = timeToElapse;
				return normalizedTimeToElaspe;
			case 'weeks':
				normalizedTimeToElaspe = timeToElapse * 7;
				return normalizedTimeToElaspe;
			case 'months':
				normalizedTimeToElaspe = timeToElapse * 30;
				return normalizedTimeToElaspe;

			default:
				return normalizedTimeToElaspe;
		}
	}

	timeToElapse = getNormalizedTimeToElaspe(timeToElapse, periodType);
	const noOfAvailableBeds = Math.trunc(totalHospitalBeds * 0.35);
	const impact = {};
	const severeImpact = {};
	// ** COMPUTATION FOR IMPACT STARTS
	impact.currentlyInfected = reportedCases * 10;
	impact.infectionsByRequestedTime = Math.trunc(impact.currentlyInfected * 2 ** (timeToElapse / 3));
	impact.severeCasesByRequestedTime = Math.trunc(0.15 * impact.infectionsByRequestedTime);
	impact.hospitalBedsByRequestedTime = noOfAvailableBeds - impact.severeCasesByRequestedTime;
	impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
	impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * impact.infectionsByRequestedTime);
	impact.dollarsInFlight = (impact.infectionsByRequestedTime *
		avgDailyIncomePopulation *
		avgDailyIncomeInUSD *
		timeToElapse).toFixed(2);

	// ** COMPUTATION FOR IMPACT ENDS

	// ** COMPUTATION FOR SEVEREIMPACT STARTS
	severeImpact.currentlyInfected = reportedCases * 50;
	severeImpact.infectionsByRequestedTime = Math.trunc(severeImpact.currentlyInfected * 2 ** (timeToElapse / 3));
	severeImpact.severeCasesByRequestedTime = Math.trunc(0.15 * severeImpact.infectionsByRequestedTime);
	severeImpact.hospitalBedsByRequestedTime = noOfAvailableBeds - severeImpact.severeCasesByRequestedTime;
	severeImpact.casesForICUByRequestedTime = Math.trunc(0.05 * severeImpact.infectionsByRequestedTime);
	severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02 * severeImpact.infectionsByRequestedTime);
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
