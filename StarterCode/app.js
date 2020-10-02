// Charts Function
function buildCharts(sample) {

        // Day 2 Activity 6
        //Read samples.json
        d3.json("samples.json").then (incomingData =>{
            console.log(incomingData)

            //Filtering through the samples by ID
            var filteredValues = incomingData.samples.filter(object => object.id == sample)[0];
            console.log(filteredValues);

            //Top 10 Sample Values reversed 
            var topValues = filteredValues.sample_values.slice(0, 10).reverse();

            //Sample Values
            var sampleValues = filteredValues.sample_values;
            console.log(sampleValues)

            //OTU ID's
            var otuIds = filteredValues.otu_ids;
            console.log(otuIds)

            //Top 10 Labels
            var labels =  filteredValues.otu_labels.slice(0,10);
            console.log (labels)

            //Top 10 otu ids reversed for bar chart
            var slicedOtuIds = (filteredValues.otu_ids.slice(0, 10)).reverse();
            console.log (slicedOtuIds)

            //Bar Plot
            var trace = {
                x: topValues,
                y: slicedOtuIds.map(d => "OTU " + d),
                text: labels,
                type:"bar",
                orientation: "h",
            };

            var data = [trace];

            var layout = {
                yaxis:{
                    tickmode:"linear",
                },
            };
    
        Plotly.newPlot("bar", data, layout);
        
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

    // Day 3 ctivity 7 & 8
    //Demographic Table Function
    function demoTable(sample) {

        //Read samples.json
        d3.json("samples.json").then((incomingData)=> {
  
            var sampleMeta = incomingData.metadata;
            console.log(sampleMeta)

            var demoInfo = d3.select("#sample-metadata");

            demoInfo.html("");

            // Filtering through the sampledata by ID
            var filteredData = sampleMeta.filter(object => object.id == sample)[0];
            console.log(filteredData)

            Object.entries(filteredData).forEach((key) => {
                demoInfo.append("div").text(key[0] + ": " + key[1])
            });
        });
    };

//Create Function to input the data into the drop down for selcting
function init () {

    // Creating variable for dropdown
    var dropdown = d3.select("#selDataset");

    //Read samples.json
    d3.json("samples.json").then (incomingData =>{
        console.log(incomingData);

        //Get the Value/Names from the data and append into the Drop Down variable
        incomingData.names.forEach(name => {
            dropdown.append("option").text(name).property("value", name);
        });

        //Calling the functions for Demo Table & Build Charts based on Names
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

