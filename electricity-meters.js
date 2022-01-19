// this is our
module.exports = function(pool) {

	// list all the streets the we have on records
	async function streets() {
		const streets = await pool.query(`select * from street`);
		return streets.rows;
	}

	// for a given street show all the meters and their balances
	async function streetMeters(streetId) {
		let allMeters = await pool.query('select street_id, balance from electricity_meteres where street_number = $1',[streetId])
		return allMeters.rows

	}

	// return all the appliances
	async function appliances() {
		let allApliances = await pool.query('select * from appliance')
		return allApliances.rows

	}

	// increase the meter balance for the meterId supplied
	async function topupElectricity(meterId, units) {
		let newBalance = await pool.query('update electricity_meter set balance = balance+ $2 where id = $1',[meterId, units])
	}
	
	// return the data for a given balance
	async function meterData(meterId,balance) {
		let allBalances = await pool.query('select * from electricity_meter where balance = $2',[meterId,balance])
		return allBalances.rows
	}

	// decrease the meter balance for the meterId supplied
	async function useElectricity(meterId, units) {
		let usage = await pool.query('select sum(balance - units)from electricity_meter where id = $1'[meterId,units])
	}
	async function totalStreetBalance(street_number){
        var totalBal = await pool.query('select sum(balance) from electricity_meter where street_number = $1',[street_number]);
        return totalBal.rows
    }

	return {
		streets,
		streetMeters,
		appliances,
		topupElectricity,
		meterData,
		useElectricity,
		totalStreetBalance

	}


}