var fs = require('fs');
var xml2js = require('xml2js');

console.log(__dirname);


var parser = new xml2js.Parser();
fs.readFile(__dirname + '/testing_with_face_landmarks.xml', function (err, data) {


    parser.parseString(data, function (err, result) {
        console.log(result);



        var trainSet = { "dataset": { name: "", comment: "js 脚本生成", images: [{ image: [] }] } };
        var testSet = { "dataset": { name: "", comment: "js 脚本生成", images: [{ image: [] }] } };






        var images = result["dataset"]["images"];
        var imagesArray = images[0]["image"];




        //{ file: 'helen/trainset/146827737_1.jpg' }


        var helenCount = 0;
        var afwCount = 0;
        var ibugCount = 0;
        var lfpwCount = 0;




        var helenTrain500 = [];
        var helenTest50 = [];






        for (var i = imagesArray.length - 1; i >= 0; i--) {
            var image = imagesArray[i];
            var fileName = image['$']['file'];
            if (fileName.startsWith("helen")) {
                helenCount++;
                if (helenCount <= 550) {
                    if (helenCount % 11 == 0) {
                        helenTest50.push(image);
                    } else {
                        helenTrain500.push(image);
                    }
                }

            }
            if (fileName.startsWith("afw")) {
                afwCount++;
            }
            if (fileName.startsWith("ibug")) {
                ibugCount++;
            }
            if (fileName.startsWith("lfpw")) {
                lfpwCount++;
            }

        }


        console.log("helenCount: " + helenCount);
        console.log("afwCount: " + afwCount);
        console.log("ibugCount: " + ibugCount);
        console.log("lfpwCount: " + lfpwCount);

        console.log('Done: ' + (helenCount + afwCount + ibugCount + lfpwCount));


        // var trainSet = {"dataset": {name: "", comment: "js 脚本生成", images: [{image: []}]}};
        // var testSet = {"dataset": {name: "", comment: "js 脚本生成", images: [{image: []}]}};


        testSet["dataset"]["images"][0]["image"] = helenTest50;
        trainSet["dataset"]["images"][0]["image"] = helenTrain500;

        console.log(helenTest50.length);
        console.log(helenTrain500.length);

        saveXml(testSet, "testing_with_face_landmarks.helenTest50.xml");
        saveXml(trainSet, "training_with_face_landmarks.helenTrain500.xml");



    });
});




function saveXml(obj, name) {
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.writeFileSync(name, xml);

}