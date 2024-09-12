var getScriptPromisify = (src) => {
	return new Promise((resolve) =>{
	$.getScript(src, resolve)
	})
}

var parseMetadata = metadata => {

	const { dimensions : dimensionMap, mainStructureMembers : measureMap} = metadata
	const dimensions = []
	for (const key in dimensionMap)
	{
		const dimension = dimensionMap[key]
		dimensions.push({key ... dimension})
	}

	const measures = []

	for (const key in measureMap)
	{
		const measure = measureMap[key]
		measures.push({key ... measure})
	}

	return {dimensions, measures, dimensionMap, measureMap}
	
}

(function () {
const template = document.createElement('template')
template.innerHTML = `
<style>
</style>
<div id="root" style="width: 100%; height: 100%;">
Hello Web Component
</div>
`
class Main extends HTMLElement {
constructor () {
super()
this._shadowRoot = this.attachShadow({ mode: 'open' })
this._shadowRoot.appendChild(template.content.cloneNode(true))
this._root = this._shadowRoot.getElementById('root')
this._eChart = null
}
onCustomWidgetResize (width, height){
	this.render();
}

onCustomWidgetAfterUpdate(changedProps){
	this.render();
}

onCustomWidgetDestroy(){
		//
}
	
async render(){
	
	const dataBinding = this.dataBinding
	if(!dataBinding || dataBinding.state !== 'success')
	{
		return
	}	

	await getScriptPromisify('https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js')

	const {data, metadata} = dataBinding

	const {dimensions, measures} = parseMetadata(metadata)

	const categoryData = []

	const series = measures.map(measure => {
		return {
			id: member.id,
			name: measure.label,
			data: [],
			key: measure.key,
			type:'line',
			smooth:true
		}
	})

	data.forEach(row => {
		categoryData.push(dimensions.map(dimension => {
			return row[dimension.key].label
		}).join('/'))
		series.forEach(series => {
			series.data.push(row[series.key].raw)
		})
	})

	if(this._eChart) { echarts.dispose(this._eChart)}
	const eChart = this._eChart = echarts.init(this._root, 'main')
	const option = {
		xAxis: { type : 'category' , data : categoryData},
		yAxis: { type : 'value'},
		tooltips: {trigger:'axis'},
		series
	}
	eChart,setOption(option)
			
	
	//this._root.textContent = JSON.stringify(dataBinding)
	
	//this._root.textContent = `Hello Custom Widget clientWidth: ${this.clientWidth}, clientHeight: ${this.clientHeight}`
}
}
customElements.define('com-sap-sac-exercise-ysg001-main', Main)
})()
