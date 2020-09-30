// Charts Function
function buildCharts(sample) {

    //Read samples.json
        d3.json("samples.json").then (incomingData =>{
            console.log(incomingData)

            //Sample Values
            var sampleValues =  incomingData.samples[0].sample_values;
            console.log(sampleValues)

            //OTU ID's
            var otuIds = incomingData.samples[0].otu_ids;
            console.log(otuIds)

            //Top 10 Labels
            var labels =  incomingData.samples[0].otu_labels.slice(0,10);
            console.log (labels)

            //Top 10 values for the bar chart and reversed 
            var slicedSampleValues =  sampleValues.slice(0,10).reverse();

            //Top 10 otu ids for the bar chart and reversed 
            var slicedOtuIds = otuIds.slice(0, 10).reverse();
            console.log (slicedOtuIds)

            //Bar Plot
            var trace = {
                x: slicedSampleValues,
                y: slicedOtuIds.map(d => "OTU " + d),
                text: labels,
                type:"bar",
                orientation: "h",
            };

            var data = [trace];
    
        Plotly.newPlot("bar", data);
        
            //Bubble Chart
            var trace1 = {
                x: otuIds,
                y: sampleValues,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIds
                },
                text: labels    
            };
    
            var layout = {
                xaxis:{title: "OTU ID"},
                height: 500,
                width: 1200
            };

            var data1 = [trace1];
    
        Plotly.newPlot("bubble", data1, layout); 
        
        });
}; 

    //Demographic Table Function
    function demoTable(sample) {
 
        d3.json("samples.json").then((incomingData)=> {
  
            var samlpleMeta = incomingData.metadata;
            console.log(samlpleMeta)

            var demoInfo = d3.select("#sample-metadata");

            demoInfo.html("");

            var filteredData = samlpleMeta.filter(object => object.id == sample)[0];
            console.log(filteredData)

            Object.entries(filteredData).forEach((key) => {
                demoInfo.append("div").text(key[0] + ": " + key[1])
            });
        });
    };

function init () {

    var dropdown = d3.select("#selDataset");

    d3.json("samples.json").then (incomingData =>{
        console.log(incomingData);

        incomingData.names.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });
        buildCharts(incomingData.names[0]);
        demoTable(incomingData.names[0]);
    });
};

init();

//Change event function
function optionChanged(sample) {
    buildCharts(sample);
    demoTable(sample);
};

