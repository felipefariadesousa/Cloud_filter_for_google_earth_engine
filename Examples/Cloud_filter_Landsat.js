//Multi-coordinates of the bay of Cartagena, Colombia
var cartagena_bay = ee.Geometry.Polygon(
        [[[-75.59124018269034, 10.295095693101942],
          [-75.58634790679292, 10.298895904175886],
          [-75.57888058446188, 10.301513727339154],
          [-75.57724980608958, 10.298473622420074],
          [-75.57682065841429, 10.294251169634652],
          [-75.57690648200273, 10.288930876156382],
          [-75.58033970545154, 10.28377936704133],
          [-75.57802225669393, 10.276685317971417],
          [-75.57493237817081, 10.273644992335656],
          [-75.56720762859463, 10.271618079124194],
          [-75.55690796247369, 10.275334076668155],
          [-75.54214510772397, 10.284961685255555],
          [-75.53047215283398, 10.291042128937237],
          [-75.53253208607153, 10.30117594130479],
          [-75.53218876388341, 10.307762744672722],
          [-75.52600896974832, 10.302611540178997],
          [-75.52489316623732, 10.298642510006669],
          [-75.52103079228097, 10.296784662622876],
          [-75.51828421466152, 10.296784662633867],
          [-75.51982916459535, 10.302358198238537],
          [-75.51055946515113, 10.304722698769218],
          [-75.5072979042126, 10.301513729541728],
          [-75.50420800439639, 10.302020411087451],
          [-75.50661125987962, 10.312998310751851],
          [-75.51038780190534, 10.316629378344052],
          [-75.51176109298291, 10.327860088050574],
          [-75.51004448200892, 10.333095319615822],
          [-75.51158943193838, 10.33816158968168],
          [-75.50970115987225, 10.344241005904504],
          [-75.50901451550212, 10.349307096143674],
          [-75.5112461098242, 10.353866507400072],
          [-75.51090278766972, 10.361971963735849],
          [-75.50970116003168, 10.3721034892947],
          [-75.51433600976019, 10.382403537423352],
          [-75.52120245372161, 10.38409203751985],
          [-75.5253223200989, 10.385780528512855],
          [-75.51948584272002, 10.380883879491822],
          [-75.5242923534827, 10.37885765744315],
          [-75.53476368053263, 10.386287074013987],
          [-75.53819690251532, 10.392534401298036],
          [-75.5349353416486, 10.39641781205879],
          [-75.5308154752841, 10.396080126091903],
          [-75.52652394783964, 10.401989577936082],
          [-75.53682361374071, 10.402664936714515],
          [-75.54025683570792, 10.403677972171266],
          [-75.54060015790947, 10.409924951495071],
          [-75.54454836316671, 10.413132811172074],
          [-75.55175812929912, 10.397768552301137],
          [-75.54231676888176, 10.392872091103174],
          [-75.54334673547164, 10.388313247891542],
          [-75.55553467347201, 10.393378625138304],
          [-75.55810958995734, 10.390001716107301],
          [-75.56652098377324, 10.395573596461759],
          [-75.57544736095615, 10.382910088411995],
          [-75.5690959003174, 10.37784454151334],
          [-75.56068450648364, 10.37075263807875],
          [-75.5515864682296, 10.367544343260601],
          [-75.54197344666932, 10.366362331624279],
          [-75.53845439412738, 10.361043224074972],
          [-75.53407703608178, 10.35589289105067],
          [-75.53665195257167, 10.353022176895688],
          [-75.54231676886178, 10.354541970008775],
          [-75.53562198596771, 10.349307096048141],
          [-75.5419689662549, 10.341237264914186],
          [-75.54529492660438, 10.340603983045764],
          [-75.54814876585738, 10.335031133581703],
          [-75.55085242818436, 10.33583329351309],
          [-75.55115283510875, 10.336804326477267],
          [-75.55235446223882, 10.337933679354288],
          [-75.5556589388617, 10.335769970669048],
          [-75.55831968604195, 10.335242228510642],
          [-75.55933890100452, 10.33606549273609],
          [-75.5616455985749, 10.337775355595223],
          [-75.56342660376278, 10.338408635254371],
          [-75.56370017707366, 10.34249851711689],
          [-75.56488839202446, 10.343361355916477],
          [-75.56659159200474, 10.34287321473528],
          [-75.56842622144455, 10.34024513861361],
          [-75.5697780644573, 10.340561773618454],
          [-75.57299671312036, 10.338281982468182],
          [-75.57475623638292, 10.33515779061402],
          [-75.57758865266723, 10.334524501742214],
          [-75.57522831132734, 10.329964805697015],
          [-75.57497081338829, 10.328613772834037],
          [-75.57291087958761, 10.327938262000083],
          [-75.57557162666745, 10.32287182714731],
          [-75.57823238341034, 10.320591911177907],
          [-75.58012064586235, 10.317129769005849],
          [-75.59316688950858, 10.317636425494348]]]);
          

//Rename bands Landsat-8 and 9 to name bands Landsat-5 and 7 equals
function rename_band(image) {
  return image.select(['QA_RADSAT', 'QA_PIXEL', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7', 'ST_B10'],
                      ['QA_RADSAT', 'QA_PIXEL', 'SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7', 'ST_B6'])
                      .copyProperties(image, ["system:time_start"])
}

//Function to Mask land (NDWI)
function mask_land(image){
  var ndwi = image.expression(
    '(green - nir) / (green + nir)',
    {
        green: image.select('SR_B2'),
        nir: image.select('SR_B4'),  
    });
  return image.updateMask(ndwi.gt(0.1))
  .copyProperties(image, ["system:time_start"])
}

//Function to Cloud mask
function mask_cloud (image) {
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  return image.updateMask(qaMask).updateMask(saturationMask)
}

//Function to Cloud_filter
function cloud_filter (image) {
  var qaMask = mask_cloud(image) //apply cloud mask in image
  
  var image_with_cloud_mask = image.updateMask(qaMask) //image with cloud mask
  var image_without_cloud_mask = image.select('SR_B2') //image without cloud mask
  
  //You can use any band. In this example, I am using SR_B2. 
  //I just need to count the pixels without any mask applied
  
  //Counting pixels number in cartagena bay in image without cloud mask
  var count_image_without_cloud_mask = image_without_cloud_mask.reduceRegion(ee.Reducer.count(),cartagena_bay,30,null,null,false,1e13).get('SR_B2')
  count_image_without_cloud_mask = ee.Number(count_image_without_cloud_mask).divide(1e6)
  
  //Counting pixels number in cartagena bay in image with cloud mask
  var count_image_with_cloud_mask = image_with_cloud_mask.reduceRegion(ee.Reducer.count(),cartagena_bay,30,null,null,false,1e13).get('SR_B2')
  count_image_with_cloud_mask = ee.Number(count_image_with_cloud_mask).divide(1e6)
  
  //Calculating the ratio between image with cloud masking and without cloud masking for get to cloud filter percentage
  var cloud_filter_percentage = (ee.Number(1).subtract(count_image_with_cloud_mask.divide(count_image_without_cloud_mask))).multiply(100)
  
  //Add proprietes for the cloud filter percentage number
  return image.set('CLOUD_COVER_BAY', cloud_filter_percentage)
}

//Scale_bands
function scale (image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0).subtract(273.15);
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBand, null, true)}

//Image Collection from Landsat 5
var L5 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
           .filterBounds(cartagena_bay)
           
//Image Collection from Landsat 7
var L7 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
           .filterBounds(cartagena_bay)
           .filterDate('1999-05-28', '2003-07-18')
           
//Image Collection from Landsat 8
var L8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
           .filterBounds(cartagena_bay)
           .map(rename_band)
           
//Image Collection from Landsat 9
var L9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
           .filterBounds(cartagena_bay)
           .map(rename_band)

//Join all Landsat images           
var image = L5.merge(L7).merge(L8).merge(L9)
image = image.map(scale).map(cloud_filter).map(mask_land)

//Centering in cartagena bay
Map.setCenter(-75.54307476890797, 10.324208272791243)

//Check all scenes
print('Check all scenes')
print(image)

//Filtering scenes with filter cloud percetage less than 20%
print('Check scenes with filter cloud percetage less than 20%')
var image_cloud_filter = image.filterMetadata('CLOUD_COVER_BAY', 'less_than', 20)

//Check scenes from imagem_cloud_filter to less than 20% 
print(image_cloud_filter)

Map.addLayer(cartagena_bay)
