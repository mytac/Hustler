function getNowDate(){
	const date=new Date();
	const year=date.getFullYear();
	const month=date.getMonth();
	const strDate=date.getDate();
	return `${year}-${month}-${strDate}`;
}

module.exports={
	getNowDate
};