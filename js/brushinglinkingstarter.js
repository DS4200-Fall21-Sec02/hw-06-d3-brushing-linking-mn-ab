var margin = { top: 10, right: 30, bottom: 50, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 450 - margin.top - margin.bottom;

// append svg object to the body of the page to house Scatterplot 1
var svg1 = d3
  .select("#dataviz_brushScatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Scatterplot 2
var svg2 = d3
  .select("#dataviz_brushScatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//TODO: append svg object to the body of the page to house Bar chart 

var svg3 = d3
  .select("#dataviz_brushScatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define color scale
var color = d3
  .scaleOrdinal()
  .domain(["setosa", "versicolor", "virginica"])
  .range(["#FF7F50", "#21908dff", "#fde725ff"]);

// Read data and make plots 
d3.csv("data/iris.csv").then((data) => {
  
  //Scatterplot 1
  {
    var xKey1 = "Sepal_Length";
    var yKey1 = "Petal_Length";

    //Add X axis
    var x1 = d3
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[xKey1])))
      .range([0, width]);
    svg1
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x1))
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xKey1)
      );

    //Add Y axis
    var y1 = d3
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[yKey1])))
      .range([height, 0]);
    svg1
      .append("g")
      .call(d3.axisLeft(y1))
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yKey1)
      );

    // Add dots
    var myCircle1 = svg1
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", function (d) {
        return x1(d[xKey1]);
      })
      .attr("cy", function (d) {
        return y1(d[yKey1]);
      })
      .attr("r", 8)
      .style("fill", function (d) {
        return color(d.Species);
      })
      .style("opacity", 0.5);

    //TODO: Define a brush  

     var brush1 = d3.brush()                     // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] )
      .on('start',clear)      // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("brush", updateChart1)
      
      

    //TODO: Add brush to the svg  
    
    svg1
    .call(brush1)
    .attr('id','brush1');

    }

  //TODO: Scatterplot 2 (show Sepal width on x-axis and Petal width on y-axis)

  {
    var xKey2 = "Sepal_Width";
    var yKey2 = "Petal_Width";

    //Add X axis
    var x2 = d3
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[xKey2])))
      .range([0, width]);
    svg2
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2))
      .call((g) =>
        g
          .append("text")
          .attr("x", width)
          .attr("y", margin.bottom - 4)
          .attr("fill", "currentColor")
          .attr("text-anchor", "end")
          .text(xKey2)
      );

    //Add Y axis
    var y2 = d3
      .scaleLinear()
      .domain(d3.extent(data.map((val) => val[yKey2])))
      .range([height, 0]);
    svg2
      .append("g")
      .call(d3.axisLeft(y2))
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yKey2)
      );

    // Add dots
    var myCircle2 = svg2
      .append("g")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("id", (d) => d.id)
      .attr("cx", function (d) {
        return x2(d[xKey2]);
      })
      .attr("cy", function (d) {
        return y2(d[yKey2]);
      })
      .attr("r", 8)
      .style("fill", function (d) {
        return color(d.Species);
      })
      .style("opacity", 0.5);

    //TODO: Define a brush  

    var brush2 = d3.brush()                     // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] )  
      .on('start',clear)         // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("brush", updateChart2)
      
      

    //TODO: Add brush to the svg

    svg2
    .call(brush2)
    .attr('id','brush2');
    
    }
  

  //TODO: Barchart with counts of different species

  {
    //Add X axis
    var xScale = d3.scaleBand()
                    .range([0, width])
                    .domain(data.map(d => d.Species)) //array of all possible species values
                    .padding(.2)
    var xAxis = d3.axisBottom(xScale);
    svg3.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);


    //Add Y axis
    var yScale = d3.scaleLinear()
                .domain([0,50]) //dataset contains 50 measurements of each species
                .range([height, 0]);
    var yAxis = d3.axisLeft(yScale);
    svg3.append("g")
      .call(yAxis);

    let species = [... new Set(data.map(d => d.Species))]; //https://stackoverflow.com/a/42123984
    let speciesData = []
    for (let i=0; i<species.length; i++) {
      let numSpecies = data.filter(d => d.Species===species[i]).length;
      speciesData.push({"Species": species[i], "Quantity": numSpecies})
    }
    console.log(speciesData)

    var myBar = svg3
      .append("g")
      .selectAll("rect")
      .data(speciesData)
      .enter()
      .append("rect")
      .attr("id", d => d.Species)
      .attr("x", d => xScale(d.Species))
      .attr("y", d => yScale(d.Quantity))
      .attr("height", d => yScale(0) - yScale(d.Quantity))
      .attr("width", xScale.bandwidth())
      .style("fill", d => color(d.Species));
  }

  //Brushing Code---------------------------------------------------------------------------------------------
    
  //Removes existing brushes from svg
    function clear() {
      svg1.call(brush1.move, null);
      svg2.call(brush2.move, null);

    }
    
    //Is called when we brush on scatterplot #1
    function updateChart1(brushEvent) {
        extent = brushEvent.selection;
    
        //TODO: Check all the circles that are within the brush region in Scatterplot 1
        myCircle1.classed("selected", function(d){ return isBrushed(extent, x1(d[xKey1]), y1(d[yKey1]) ) } )
    
        //TODO: Select all the data points in Scatterplot 2 which have the same id as those selected in Scatterplot 1
        var selectedIDs = svg1.selectAll(".selected").nodes().map((circle) => circle['id']);
        myCircle2.classed("selected", (d) => selectedIDs.includes(d.id) )

    }

    //Is called when we brush on scatterplot #2
    function updateChart2(brushEvent) {
      extent = brushEvent.selection;

      //TODO: Check all the circles that are within the brush region in Scatterplot 2
      myCircle2.classed("selected", function(d){ return isBrushed(extent, x2(d[xKey2]), y2(d[yKey2]) )}) ;
      //TODO: Select all the data points in Scatterplot 1 which have the same id as those selected in Scatterplot 2
      var selectedIDs = svg2.selectAll(".selected").nodes().map((circle) => circle['id']);
      myCircle1.classed("selected", (d) => selectedIDs.includes(d.id) );
      //TODO: Select bars in bar chart based on species selected in Scatterplot 2
      var selectedSpecies = [... new Set(data.filter(d => selectedIDs.includes(d.id)).map(d => d.Species))];
      myBar.classed("selected", d => selectedSpecies.includes(d.Species))

    }

    //Finds dots within the brushed region
    function isBrushed(brush_coords, cx, cy) {
      if (brush_coords === null) return;

      var x0 = brush_coords[0][0],
        x1 = brush_coords[1][0],
        y0 = brush_coords[0][1],
        y1 = brush_coords[1][1];
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1; // This return TRUE or FALSE depending on if the points is in the selected area
    }
});
