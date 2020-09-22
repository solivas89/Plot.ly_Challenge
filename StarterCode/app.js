function buildCharts(sample) {
    console.log(sample)
}




function init () {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then (incomingData =>{
        console.log(incomingData);

        incomingData.names.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });

        buildCharts(incomingData.names[0]);

    });
};

init();


function optionChanged(sample) {
    buildCharts(sample)
}
    // var sampleValues = incomingData.samples[0].sample_values;
    //     console.log(sampleValues)

    //     var sampleIds = incomingData.samples[0].otu_ids;
    //     console.log(sampleIds)
