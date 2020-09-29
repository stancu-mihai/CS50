// Counter for shape name
var i = 0;
var j;
var parameters = ['slope', 'up', 'down', 'height', 'side', 'alpha', 'radius', 'length', 'width', 'area'];
// Declare array for points for free shape
var points = new Array();
var scaleFactor=1;

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// Creates the first row of the group (with shape number and type select)
function CreateFirstRow(no, newshape, selectedShape)
  {
    // Create a new label that will contain the name of the shape
    var labelname = document.createElement("label");
    labelname.textContent = 'Forma'+no;
    labelname.id='labelname'+no;
    // Create a select object
    var select = document.createElement("select");
    // With value of number type, not string
    select.value = 'number';
    // And the unique id
    select.id = 'select' + no;
    // When it is changed by click, add or refresh elements to the right
    select.onchange = function() { 
      if (select.value == 1)
	  {
	  	CreateGroupForTrapeze(no,newshape);
	  }
	  else if (select.value == 2)
	  {
        CreateGroupForTriangle(no,newshape);
	  }
	  else if (select.value == 3)
	  {
        CreateGroupForParallelogram(no,newshape);
	  }
	  else if (select.value == 4)
	  {
        CreateGroupForRectangle(no,newshape);
	  }
	  else if (select.value == 5)
	  {
        CreateGroupForCone(no,newshape);
	  }
	  else if (select.value == 6)
	  {
        CreateGroupForFreeShape(no, newshape);
	  }
  };
  // Define options for select
  var op1 = document.createElement("option");
  op1.value = 1;
  op1.text = "Trapez";
  select.options.add(op1);
  var op2 = document.createElement("option");
  op2.value = 2;
  op2.text = "Triunghi";
  select.options.add(op2);
  var op3 = document.createElement("option");
  op3.value = 3;
  op3.text = "Paralelogram";
  select.options.add(op3);
  var op4 = document.createElement("option");
  op4.value = 4;
  op4.text = "Dreptunghi";
  select.options.add(op4);
  var op5 = document.createElement("option");
  op5.value = 5;
  op5.text = "Con";
  select.options.add(op5);
  var op6 = document.createElement("option");
  op6.value = 6;
  op6.text = "Forma libera";
  select.options.add(op6);
  // Append these options to the select
  select.appendChild(op1);
  select.appendChild(op2);
  select.appendChild(op3);
  select.appendChild(op4);
  select.appendChild(op5);
  select.appendChild(op6);
  // Append all of the objects to the newshape div
  newshape.appendChild(labelname);
  newshape.appendChild(select);
  select.options[selectedShape-1].selected = true;
  }

// Creates an input row with specified id and default value
function CreateRow(id, value, newshape, withType ,disabled, no)
  {
  	var label = document.createElement("label");
    var input = document.createElement("input");
	// Set the id sent through the function parameters for input
	input.id = id;
	// And for the label
	label.id = 'label'+id;
	label.textContent = value;
	InsertParagraph(newshape, no);
	if (withType)
	{
		var select = document.createElement("select");
		select.id = 'type'+id;
		var opt1 = document.createElement("option");
		var opt2 = document.createElement("option");
		var opt3 = document.createElement("option");
		var opt4 = document.createElement("option");
		opt1.value=1;
		opt2.value=2;
		opt3.value=3;
		opt4.value=4;
		opt1.text = "Coama";
		opt2.text = "Dolie";
		opt3.text = "Pieptan";
		opt4.text = "Fara";
		select.appendChild(opt1);
		select.appendChild(opt2);
		select.appendChild(opt3);
		select.appendChild(opt4);
		newshape.appendChild(select);
	}
	newshape.appendChild(label);
	newshape.appendChild(input);
	if (disabled)
	{
	  input.disabled = true;
	}
	else
	{
	  input.setAttribute("onchange","UpdateGeomCharacteristics(" + no + ")");
	}
  }
  
// Creates an input row with specified id and default value
function CreateTypeRowWithLabel(no, value, id, newshape)
  {
  	var label = document.createElement("label");
	var select = document.createElement("select");
    label.id = 'label'+id;
	label.textContent = value;
    select.id = id;
	var opt1 = document.createElement("option");
	var opt2 = document.createElement("option");
	var opt3 = document.createElement("option");
	var opt4 = document.createElement("option");
	opt1.value=1;
	opt2.value=2;
	opt3.value=3;
	opt4.value=4;
	opt1.text = "Coama";
	opt2.text = "Dolie";
	opt3.text = "Pieptan";
	opt4.text = "Fara";
	select.appendChild(opt1);
	select.appendChild(opt2);
	select.appendChild(opt3);
	select.appendChild(opt4);
	select.setAttribute("onchange","UpdateGeomCharacteristics(" + no + ")");
	newshape.appendChild(select);
    InsertParagraph(newshape, no);
	newshape.appendChild(label);
	newshape.appendChild(select);
  }
  
// Creates a image in the group
function CreateImage(newshape, selectedShape)
  {
    var image = document.createElement("img");
    image.setAttribute("height", "148");
    image.setAttribute("width",  "194");
  	if (selectedShape == 1)
	{
		image.setAttribute("src", "img/trapeze.png");
	}
	else if (selectedShape == 2)
	{
        image.setAttribute("src", "img/triangle.png");
	}
	else if (selectedShape == 3)
	{
        image.setAttribute("src", "img/parallelogram.png");
	}
	else if (selectedShape == 4)
	{
        image.setAttribute("src", "img/rectangle.png");
	}
	else
	{
        image.setAttribute("src", "img/cone.png");
	}
	newshape.appendChild(image);
  }
    
function coordinate(x, y) {
    this.x = x;
    this.y = y;
}
	
// Updates the value for area function of shape and parameters 'slope', 'up', 'down', 'height', 'side', 'slope', 'radius', 'area'];
function UpdateGeomCharacteristics(no)
  {
	var select=document.getElementById("select"+no);
	var up=document.getElementById('up'+no);
	var down=document.getElementById('down'+no);
	var height=document.getElementById('height'+no);
	var side=document.getElementById('side'+no);
	var slope=document.getElementById('slope'+no);
	var radius=document.getElementById('radius'+no);
	var length=document.getElementById('length'+no);
	var width=document.getElementById('width'+no);
	var typeleft=document.getElementById('typeleft'+no);
	var typeright=document.getElementById('typeright'+no);
	var area=document.getElementById('area'+no);
	var hip=document.getElementById('hip'+no);
	var ridge=document.getElementById('ridge'+no);
	var valley=document.getElementById('valley'+no);
	var rake=document.getElementById('rake'+no);
	var typeup=document.getElementById('typeup'+no);
	var hiptmp=0, raketmp=0, valtmp=0;
	var lines = document.getElementById("lines"+no);
	if (select.value == 1) //trapeze (assumed equal sides here)
	{
		var left=parseFloat(Math.sqrt(2)*height.value*(1/Math.cos(toRadians(slope.value)))).toFixed(2);
		var right=left;
    	switch(typeup.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(up.value));
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(up.value));
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(up.value));
          break;
		}
		switch(typeleft.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(left)).toFixed(2);
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(left)).toFixed(2);
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(left)).toFixed(2);
          break;
		}
		switch(typeright.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(right)).toFixed(2);
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(right)).toFixed(2);
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(right)).toFixed(2);
          break;
		}
		
		if (down.value)
		{
			raketmp=parseFloat(parseFloat(raketmp)+parseFloat(down.value)).toFixed(2);
		}
		area.value=parseFloat((parseFloat(up.value) + parseFloat(down.value)) * (parseFloat(height.value)/2) * (1/Math.cos(toRadians(slope.value)))).toFixed(2);
	}
	else if (select.value == 2) //triangle (assumed equal sides here)
	{
		var left=parseFloat(Math.sqrt(Math.pow((side.value/2),2) + Math.pow((height.value),2))* (1/Math.cos(toRadians(slope.value)))).toFixed(2);
		var right=left;
		switch(typeleft.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(left)).toFixed(2);
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(left)).toFixed(2);
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(left)).toFixed(2);
          break;
		}
		switch(typeright.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(right)).toFixed(2);
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(right)).toFixed(2);
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(right)).toFixed(2);
          break;
		}
		if (side.value)
		{
			raketmp=parseFloat(parseFloat(raketmp)+parseFloat(side.value)).toFixed(2);
		}
        area.value=parseFloat((parseFloat(side.value) * parseFloat(height.value) / 2) * (1/Math.cos(toRadians(slope.value)))).toFixed(2);
	}
	else if (select.value == 3) //parallelogram (assumed equal sides)
	{
		var left=parseFloat(Math.sqrt(2)*height.value*(1/Math.cos(toRadians(slope.value)))).toFixed(2);
		var right=left;
    	switch(typeup.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(side.value));
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(side.value));
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(side.value));
          break;
		}
		switch(typeleft.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(left)).toFixed(2);
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(left)).toFixed(2);
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(left)).toFixed(2);
          break;
		}
		switch(typeright.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(right)).toFixed(2);
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(right)).toFixed(2);
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(right)).toFixed(2);
          break;
		}
		
		if (side.value)
		{
			raketmp=parseFloat(parseFloat(raketmp)+parseFloat(side.value)).toFixed(2);
		}
        area.value=parseFloat((parseFloat(side.value) * parseFloat(height.value) / 2) * (1/Math.cos(toRadians(slope.value)))).toFixed(2);
	}
	else if (select.value == 4)  //rectangle
	{
		var left=width.value;
		var right=left;
    	switch(typeup.value) {
        case '1':
          hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(length.value));
          break;
        case '2':
          valtmp=parseFloat(parseFloat(valtmp)+parseFloat(length.value));
          break;
        case '3':
          raketmp=parseFloat(parseFloat(raketmp)+parseFloat(length.value));
          break;
		}
		if(width.value)
		{
			switch(typeleft.value) {
			case '1':
				hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(left)).toFixed(2);
				break;
			case '2':
				valtmp=parseFloat(parseFloat(valtmp)+parseFloat(left)).toFixed(2);
				break;
			case '3':
				raketmp=parseFloat(parseFloat(raketmp)+parseFloat(left)).toFixed(2);
				break;
			}
			
			switch(typeright.value) {
			case '1':
				hiptmp=parseFloat(parseFloat(hiptmp)+parseFloat(right)).toFixed(2);
				break;
			case '2':
				valtmp=parseFloat(parseFloat(valtmp)+parseFloat(right)).toFixed(2);
				break;
			case '3':
				raketmp=parseFloat(parseFloat(raketmp)+parseFloat(right)).toFixed(2);
				break;
			}
			
			raketmp=parseFloat(parseFloat(raketmp)+parseFloat(width.value)).toFixed(2);
		}
		else
		{	
	        switch(typeleft.value) {
			case '1':
				hiptmp=parseFloat(parseFloat(hiptmp)).toFixed(2);
				break;
			case '2':
				valtmp=parseFloat(parseFloat(valtmp)).toFixed(2);
				break;
			case '3':
				raketmp=parseFloat(parseFloat(raketmp)).toFixed(2);
				break;
			}
			
			switch(typeright.value) {
			case '1':
				hiptmp=parseFloat(parseFloat(hiptmp)).toFixed(2);
				break;
			case '2':
				valtmp=parseFloat(parseFloat(valtmp)).toFixed(2);
				break;
			case '3':
				raketmp=parseFloat(parseFloat(raketmp)).toFixed(2);
				break;
			}
		}
		
        area.value=parseFloat(parseFloat(length.value) * parseFloat(width.value) * (1/Math.cos(toRadians(slope.value)))).toFixed(2);
	}
	else if (select.value == 5) //cone
	{
        area.value=parseFloat((Math.PI * parseFloat(radius.value) * parseFloat(height.value)) * (parseFloat(slope.value) / 360)).toFixed(2);
	}
	else //free shape
	{
		// clear array
		points=[];
		
		// Declare the previous coordinates
		var prevx=500;
		var prevy=400;
		for (j=1; j<=lines.value;j++)
		{
			var dirline =document.getElementById("dirline"+no+"-"+j);
			var dimline =document.getElementById("dimline"+no+"-"+j);
			var typeline=document.getElementById("typeline"+no+"-"+j);
			points.push(new coordinate(prevx, prevy));
			if (dirline.value==1)     // East
			{
				prevx+=parseFloat(dimline.value);
			}
			else if (dirline.value==2)// North-East
			{
				prevx+=parseFloat(dimline.value/Math.sqrt(2)); 
				prevy-=parseFloat(dimline.value/Math.sqrt(2))*(1/Math.cos(toRadians(slope.value))); 
			}
			else if (dirline.value==3)// North
			{
				prevy-=parseFloat(dimline.value)*(1/Math.cos(toRadians(slope.value))); 
			}
			else if (dirline.value==4)// North-Vest
			{
				prevx-=parseFloat(dimline.value/Math.sqrt(2)); 
				prevy-=parseFloat(dimline.value/Math.sqrt(2))*(1/Math.cos(toRadians(slope.value))); 
			}
			else if (dirline.value==5)// Vest
			{
				prevx-=parseFloat(dimline.value); 
			}
			else if (dirline.value==6)// South-Vest
			{
				prevx-=parseFloat(dimline.value/Math.sqrt(2)); 
				prevy+=parseFloat(dimline.value/Math.sqrt(2))*(1/Math.cos(toRadians(slope.value))); 
			}
			else if (dirline.value==7)// South
			{
				prevy+=parseFloat(dimline.value)*(1/Math.cos(toRadians(slope.value))); 
			}
			else if (dirline.value==8)   // South-East
			{
				prevx+=parseFloat(dimline.value/Math.sqrt(2)); 
				prevy+=parseFloat(dimline.value/Math.sqrt(2))*(1/Math.cos(toRadians(slope.value))); 
			}
			
			var temp=parseFloat(dimline.value);
			if (typeline.value == 1)
			{
				if (dirline.value % 2 == 1) // If the direction is straight (N,E,S,V)
				{
					hiptmp+=temp;
				}
				else
				{
					hiptmp+=temp*(1/Math.cos(toRadians(slope.value)));
				}
			}
			else if (typeline.value == 2)
			{
				if (dirline.value % 2 == 1) // If the direction is straight (N,E,S,V)
				{
					valtmp+=temp;
				}
				else
				{
					valtmp+=temp*(1/Math.cos(toRadians(slope.value)));
				}
			}
			else if (typeline.value == 3)
			{
				if (dirline.value % 2 == 1) // If the direction is straight (N,E,S,V)
				{
					raketmp+=temp;
				}
				else
				{
					raketmp+=temp*(1/Math.cos(toRadians(slope.value)));
				}
			}
		}
		points.push(new coordinate(prevx, prevy));

		// Calculate area of free shape
		var total = 0;
		for (var i = 0, l = points.length; i < l; i++) {
			var addX = points[i].x;
			var addY = points[i == points.length - 1 ? 0 : i + 1].y;
			var subX = points[i == points.length - 1 ? 0 : i + 1].x;
			var subY = points[i].y;
			total += (addX * addY * 0.5);
			total -= (subX * subY * 0.5);
		}
		area.value=parseFloat(Math.abs(total)).toFixed(2);
	}	
	hip.value=parseFloat(hiptmp).toFixed(2);
	rake.value=parseFloat(raketmp).toFixed(2);
	valley.value=parseFloat(valtmp).toFixed(2);
  }
  
// Updates the value for area and the drawing of points
function UpdateGeomAndDrawing(no)
  {
	UpdateGeomCharacteristics(no);
	// Creates a canvas in the group
	var slope=document.getElementById('slope'+no);
    var canvas = document.getElementById('canvas'+no);
    var context = canvas.getContext("2d");
    var centerCanvasX = canvas.width / 2;
    var centerCanvasY = canvas.height / 2;
    var lines = [];

    var prevx=centerCanvasX;
	var prevy=centerCanvasY;
	
	for (j=1; j<points.length;j++)
	{
		lines.push({
		id: "line"+no+'-'+j,
		startx: prevx,
		starty: prevy,
		endx: points[j].x,
		endy: points[j].y,
		color: "red"
		});
		prevx=points[j].x;
		prevy=points[j].y;
	}
	
	context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
	context.lineWidth=5;
    context.scale(scaleFactor, scaleFactor * Math.cos(toRadians(slope.value)));
    for (var k = 0; k < lines.length; k++) {
        var node = lines[k];
        context.beginPath();
        context.moveTo(node.startx, node.starty);
        context.lineTo(node.endx, node.endy);
        context.stroke();
        context.fillStyle = node.color;
        context.fill();
    }
    context.restore();
  }
  
// Creates the group with parameters for trapeze
function CreateGroupForTrapeze(no)
  {
    // If we are not making the first shape
    if (i!=0)
	{
      DeleteGroup(no);
	}
	var parentdiv = document.getElementById("shapes");
    // Create a div inside that div containing the name and number of the shape
    var newshape = document.createElement('div');
	CreateImage(newshape, 1);
    newshape.id = 'shape'+no;
	CreateFirstRow(no, newshape, 1);
	CreateRow('slope' + no , 'Panta (grade)' , newshape, false, false, no);
	CreateRow('up' + no,     'b (mm)'        , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'b', 'typeup'+no, newshape);
	CreateRow('down' + no,   'B (mm)'        , newshape, false, false, no);
	CreateRow('height' + no, 'h (mm)'        , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'Lat. stanga', 'typeleft'+no, newshape);
	CreateTypeRowWithLabel(no, 'Lat. dreapta', 'typeright'+no, newshape);
    CreateRow('hip' + no,    'Coama(mm)'   , newshape, false, true, no);
	CreateRow('valley' + no,  'Dolie(mm)'   , newshape, false, true, no);
	CreateRow('rake' + no,   'Pieptan(mm)'       , newshape, false, true, no);
	CreateRow('area' + no,   'A (mm2)'       , newshape, false, true, no);
    InsertParagraph(newshape, no);
	parentdiv.appendChild(newshape);
  }
  
// Creates the group with parameters for triangle
function CreateGroupForTriangle(no)
  {
    DeleteGroup(no);
    var parentdiv = document.getElementById("shapes");
    // Create a div inside that div containing the name and number of the shape
    var newshape = document.createElement('div');
	CreateImage(newshape, 2);
    newshape.id = 'shape'+no;
	CreateFirstRow(no, newshape, 2);
	CreateRow('slope' + no , 'Panta (grade)' , newshape, false, false, no);
	CreateRow('side' + no,   'B (mm)'	     , newshape, false, false, no);
	CreateRow('height' + no, 'h (mm)'	     , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'Lat. stanga', 'typeleft'+no, newshape);
	CreateTypeRowWithLabel(no, 'Lat. dreapta', 'typeright'+no, newshape);
	CreateRow('hip' + no,    'Coama(mm)'   , newshape, false, true, no);
	CreateRow('valley' + no,  'Dolie(mm)'   , newshape, false, true, no);
	CreateRow('rake' + no,   'Pieptan(mm)'       , newshape, false, true, no);
	CreateRow('area' + no,   'A (mm2)'       , newshape, false, true , no);
    InsertParagraph(newshape, no);
	parentdiv.appendChild(newshape);
  }
  
// Creates the group with parameters for parallelogram
function CreateGroupForParallelogram(no)
  {
    DeleteGroup(no);
	var parentdiv = document.getElementById("shapes");
    // Create a div inside that div containing the name and number of the shape
    var newshape = document.createElement('div');
	CreateImage(newshape, 3);
    newshape.id = 'shape'+no;
	CreateFirstRow(no, newshape, 3);
	CreateRow('slope' + no , 'Panta (grade)', newshape, false, false, no);
	CreateRow('side' + no,   'Binf (mm)'       , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'Bsup', 'typeup'+no, newshape);
	CreateRow('height' + no, 'h (mm)' 	    , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'Lat. stanga', 'typeleft'+no, newshape);
	CreateTypeRowWithLabel(no, 'Lat. dreapta', 'typeright'+no, newshape);
	CreateRow('hip' + no,    'Coama(mm)'   , newshape, false, true, no);
	CreateRow('valley' + no,  'Dolie(mm)'   , newshape, false, true, no);
	CreateRow('rake' + no,   'Pieptan(mm)'       , newshape, false, true, no);
	CreateRow('area' + no,   'A (mm2)'       , newshape, false, true , no);
    InsertParagraph(newshape, no);
	parentdiv.appendChild(newshape);
  }
  
// Creates the group with parameters for rectangle
function CreateGroupForRectangle(no)
  {
    DeleteGroup(no);
	var parentdiv = document.getElementById("shapes");
    // Create a div inside that div containing the name and number of the shape
    var newshape = document.createElement('div');
	CreateImage(newshape, 4);
    newshape.id = 'shape'+no;
	CreateFirstRow(no, newshape, 4);
	CreateRow('slope' + no , 'Panta (grade)', newshape, false, false, no);
	CreateRow('length' + no,   'Linf (mm)'  , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'Lsup', 'typeup'+no, newshape);
	CreateRow('width' + no, 'l (mm)' 	    , newshape, false, false, no);
	CreateTypeRowWithLabel(no, 'Lat. stanga', 'typeleft'+no, newshape);
	CreateTypeRowWithLabel(no, 'Lat. dreapta', 'typeright'+no, newshape);
	CreateRow('hip' + no,    'Coama(mm)'   , newshape, false, true, no);
	CreateRow('valley' + no,  'Dolie(mm)'   , newshape, false, true, no);
	CreateRow('rake' + no,   'Pieptan(mm)'       , newshape, false, true, no);
	CreateRow('area' + no,   'A (mm2)'       , newshape, false, true , no);
    InsertParagraph(newshape, no);
	parentdiv.appendChild(newshape);
  }
  
// Creates the group with parameters for cone
function CreateGroupForCone(no)
  {
    DeleteGroup(no);
	var parentdiv = document.getElementById("shapes");
    // Create a div inside that div containing the name and number of the shape
    var newshape = document.createElement('div');
	CreateImage(newshape, 5);
    newshape.id = 'shape'+no;
	CreateFirstRow(no, newshape, 5);
	CreateRow('slope' + no , 'Panta (grade)' , newshape, false, false, no);
	CreateRow('alpha' + no,    'a (grade)'   , newshape, false, false, no);
	CreateRow('radius' + no, 'R (mm)'	     , newshape, false, false, no);
	CreateRow('height' + no, 'h (mm)' 	     , newshape, false, false, no);
	CreateRow('hip' + no,    'Coama(mm)'   , newshape, false, true, no);
	CreateRow('valley' + no,  'Dolie(mm)'   , newshape, false, true, no);
	CreateRow('rake' + no,   'Pieptan(mm)'       , newshape, false, true, no);
	CreateRow('area' + no,   'A (mm2)'       , newshape, false, true , no);
    InsertParagraph(newshape, no);
	parentdiv.appendChild(newshape);
  }
  
// Creates the group with parameters for cone
function CreateGroupForFreeShape(no, newshape)
  {
    DeleteGroup(no);
	var parentdiv = document.getElementById("shapes");
    var newshape = document.createElement('div');
	var label = document.createElement("label");
    var input = document.createElement("input");

    newshape.id = 'shape'+no;
	CreateFirstRow(no, newshape, 6);
	CreateCanvas(newshape, no);

	input.id = 'lines'+no;
	label.id = 'labellines'+no;
	label.textContent = 'Numar linii';

    InsertParagraph(newshape, no);
	newshape.appendChild(label);
	newshape.appendChild(input);
	input.setAttribute("onchange","CreateListOfLinesInput(" + no + ")");
	CreateRow('slope' + no , 'Panta (grade)' , newshape, false, false, no);
	CreateRow('hip' + no,    'Coama'   , newshape, false, true, no);
	CreateRow('valley' + no,  'Dolie(mm)'   , newshape, false, true, no);
	CreateRow('rake' + no,   'Pieptan'       , newshape, false, true, no);
	CreateRow('area' + no,   'A (mm2)'       , newshape, false, true , no);
	InsertParagraph(newshape, no);
	parentdiv.appendChild(newshape);
  }

// Creates a canvas in the group
function CreateCanvas(newshape, no)
  {
	var scaleup = document.createElement("INPUT");
    scaleup.setAttribute("type", "button");
	scaleup.setAttribute("value", "+");
	scaleup.setAttribute("onclick", "ScaleUp("+no+")");
	var scaledown = document.createElement("INPUT");
	scaledown.setAttribute("type", "button");
	scaledown.setAttribute("value", "-");
	scaledown.setAttribute("onclick", "ScaleDown("+no+")");
    var canvas = document.createElement('canvas');
	var context = canvas.getContext("2d");
	context.scale(scaleFactor, scaleFactor);
    canvas.id     = "canvas"+no;
    canvas.width  = 1000;
    canvas.height = 800;
	newshape.appendChild(scaleup);
	newshape.appendChild(scaledown);
	newshape.appendChild(canvas);
  }
  
function ScaleUp(no)
  {
	  scaleFactor+=0.2;
	  UpdateGeomAndDrawing(no);
  }
  
function ScaleDown(no)
  {
	  scaleFactor-=0.2;
	  UpdateGeomAndDrawing(no);
  }

// Used by freeshape. It creates the list of input for lines lengths and angles, function of the number of lines entered
function CreateListOfLinesInput(no)
  {
	var curshape = document.getElementById('shape'+no);
	var linesno = document.getElementById('lines'+no);
    for (j=1;j<=linesno.value;j++)
	  {
		var label = document.createElement("label");
		var select1 = document.createElement("select");
		var input = document.createElement("input");
		var select2 = document.createElement("select");
	    label.id = 'labeldimline'+no+'-'+j;
	    label.textContent = 'Linia'+j+'-dir,L(mm),tip';
		select1.id = 'dirline'+no+'-'+j;
		input.id = 'dimline'+no+'-'+j;
	    select2.id = 'typeline'+no+'-'+j;
        var op1 = document.createElement("option");
		var op2 = document.createElement("option");
		var op3 = document.createElement("option");
		var op4 = document.createElement("option");
		var op5 = document.createElement("option");
		var op6 = document.createElement("option");
		var op7 = document.createElement("option");
		var op8 = document.createElement("option");
		var opt1 = document.createElement("option");
		var opt2 = document.createElement("option");
		var opt3 = document.createElement("option");
		var opt4 = document.createElement("option");
		opt1.value=1;
		opt2.value=2;
		opt3.value=3;
		opt4.value=4;
		opt1.text = "Coama";
		opt2.text = "Dolie";
		opt3.text = "Pieptan";
		opt4.text = "Fara";
        op1.value = 1;
		op2.value = 2;
		op3.value = 3;
		op4.value = 4;
		op5.value = 5;
		op6.value = 6;
		op7.value = 7;
		op8.value = 8;
        op1.text = "E";
		op2.text = "NE";
		op3.text = "N";
		op4.text = "NV";
		op5.text = "V";
		op6.text = "SV";
		op7.text = "S";
		op8.text = "SE";
        select1.appendChild(op1);
        select1.appendChild(op2);
        select1.appendChild(op3);
		select1.appendChild(op4);
		select1.appendChild(op5);
		select1.appendChild(op6);
		select1.appendChild(op7);
		select1.appendChild(op8);
		select2.appendChild(opt1);
        select2.appendChild(opt2);
        select2.appendChild(opt3);
		select2.appendChild(opt4);
		select1.setAttribute("onchange","UpdateGeomAndDrawing(" + no + ")");
		input.setAttribute("onchange","UpdateGeomAndDrawing(" + no + ")");
		select2.setAttribute("onchange","UpdateGeomAndDrawing(" + no + ")");
		curshape.appendChild(label);
		curshape.appendChild(select1);
		curshape.appendChild(input);
		curshape.appendChild(select2);
		InsertParagraph(curshape, no);
	  }
	linesno.disabled=true;
  }		
 
// Deletes the group content when changing shape in order to add new group
function DeleteGroup(no)
  {
	// get div for last drawn shape and delete it
    var shape=document.getElementById('shape'+i);
	if (shape)
	{
	  (shape).parentNode.removeChild(shape);
	}
  }
  
// Creates the space between shapes
function InsertParagraph(newshape, no)
  {
	var para = document.createElement("p");
	newshape.appendChild(para);
  }
  
function ClickAdd() {
  i = i + 1;
  CreateGroupForTrapeze(i);
};

function ClickCompute()  
  {
    var areasum = 0, hipsum=0, valsum=0, rakesum=0;
    for (j = 1; j <= i; ++j) 
    {
      var area=document.getElementById('area'+j);
	  var hip=document.getElementById('hip'+j);
	  var valley=document.getElementById('valley'+j);
	  var rake=document.getElementById('rake'+j);
      areasum=parseFloat(parseFloat(area.value) + parseFloat(areasum)).toFixed(2);
	  hipsum=parseFloat(parseFloat(hip.value) + parseFloat(hipsum)).toFixed(2);
	  valsum=parseFloat(parseFloat(valley.value) + parseFloat(valsum)).toFixed(2);
	  rakesum=parseFloat(parseFloat(rake.value) + parseFloat(rakesum)).toFixed(2);
    };
    alert('Aria totala:'+areasum+'\n'+'Coama  totala:'+hipsum+'\n'+'Dolie  totala:'+valsum+'\n'+'Piept. total:'+rakesum+'\n');
  }
  
function ClickDelete()  
  {
    DeleteGroup(i);
	// Decrease number of shapes
	i = i - 1;
  }