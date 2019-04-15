/****get parent folder***/
function getFolder(drive,id) {
    drive.files.get({
        fileId: id,
        fields: 'parents'
    }, function (err, filex) {
        if (err) {
            // Handle error
            console.error("get parent folder error", err);
        } else {
            return filex.data.parents;
        }
    });
}
  /****end get parent ****/