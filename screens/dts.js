
  const onSubmit = async (data) => {
    setLoading(true)
    const secretCode = data.deviceSecrentCode;
    const secretCodetCheckInfo = {secretCode, transferDeviceId};

    try{
      const response = await axios.put(`http://192.168.0.154:5000/verifydevicesecretCode/`, {secretCodetCheckInfo})
      if(response.data.secretCodeStatus){
          setLoading(true)
          const uploadPromises = selectedImages.map(async (uri) => {
            return await uploadImageAsync(uri);
          });
          const newFirebaseImages = await Promise.all(uploadPromises);
          setFirebaseIamge([...newFirebaseImages]);
          const deviceImgList = [...newFirebaseImages];
          
          const deviceIamges = [{deviceImgList, ownerEmail: user?.userEmail}];
          await devcieAccepetRequist(deviceIamges)

          await signatureRef.current.readSignature();

        }else if(response.data.secretCodeStatus){
          setLoading(false)
          alert("Secret Code is wrong!")
          setAcceptStatus("Secret Code is wrong!")
          isAccepetDevcieProcesing(false)
      }
    }
    catch (error) {
      console.log("Status Faild During Secret Code Check", error);
      isAccepetDevcieProcesing(false)
    }
    finally{
        setLoading(false)
        isAccepetDevcieProcesing(fasle)
    }
  } 
  
  const handleOK = (signature) => {
    isAccepetDevcieProcesing(true);
    setSignatureSign(signature); 
    if(signature){
    const path = FileSystem.cacheDirectory + "sign.png";
    FileSystem.writeAsStringAsync(
        path,
        signature.replace("data:image/png;base64,", ""),
        { encoding: FileSystem.EncodingType.Base64 }
    )
    .then(() => FileSystem.getInfoAsync(path))
    .then(async (datas) => {
        const {uri} = datas;
        const ownerSign = uri;   
        const ownerSignUrl = await uploadImageAsync(ownerSign);
        if(ownerSignUrl){
          const reciverOwnerSign = ownerSignUrl;
          const {brand, ram, storage, deviceModelName, deviceImei} = acceptDevice;
          const transDevcieInfo = {brand, ram, storage, deviceModelName, deviceImei};
          createAPdf(reciverOwnerSign, transDevcieInfo)
        }
    })
    .catch(console.error);
    }
  }

  
  const createAPdf = async (reciverOwnerSign, transDevcieInfo) => {
    isAccepetDevcieProcesing(true)
    const deviceOwnerSign = acceptDevice?.ownerSignUrl;
    let html = OwnerTransferInvoice(deviceOwnerData, reciverOwnerSign, reciverOwnerData, deviceOwnerSign, transDevcieInfo);
    try{
      const {uri} = await Print.printToFileAsync({html});
      console.log('File has been saved to:', uri);
      const pdfUri = await fetch(uri);
      const pdfUriBlob = await pdfUri.blob();
      const pdfName = acceptDevice?._id + acceptDevice?.deviceImei;
      console.log("🚀 ~ file: VerifyDeviceAcceft.js:182 ~ createAPdf ~ pdfName:", pdfName)
      uploadPdfFile(pdfUriBlob, pdfName, isPdfUploadCompleted)
    }catch(err){
      console.log(err)
      Alert.alert("Make shure You have Internet Connection");
    }
  }

  const uploadPdfFile = async (pdfUriBlob, pdfName, isPdfUploadCompleted) => {
    isAccepetDevcieProcesing(true)
    if (pdfUriBlob) {
      console.log('Uploading Pdf File....')
      setUploadStart(true)
      const sotrageRef = ref(storage, `ownerShipTransferInvoice/${pdfName}`);
      const uploadTask = uploadBytesResumable(sotrageRef, pdfUriBlob);
      uploadTask.on(
        "state_changed", null ,
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            if(downloadURL){
              console.log("File available at", downloadURL);
                // console.log(downloadURL)
                devcieAccepetRequist(downloadURL)
                isPdfUploadCompleted(true)
              }
          });
        }
      );

    }
  }

  const devcieAccepetRequist = async (downloadURL) => {
    setLoading(true);
    isAccepetDevcieProcesing(true)
    const deviceId = acceptDevice?.deviceId;
    const devicereciverEmail = user?.userEmail;
    const previusDeviceOwner = acceptDevice?.ownerEmail;
    const devcieOwnerSecretOTP = Math.floor(100000 + Math.random() * 900000);
    const newDeviceOwner = {
      deviceNote: "",
      ownarStatus: "",
      ownerHaveAInvoice: true,
      invoiceUrl: downloadURL,
      thisIsCurrentOwner: true,
      ownerName: user?.userName,
      deviceLostNoteMessage: "",
      thisIsPreviousOwner: false,
      deviceListingDate: todyDate,
      ownerEmail: user?.userEmail,
      ownerId: user?.userAccountId,
      deviceTransferDate: todyDate,
      thisIsUnAuthorizeOwner: false,
      ownerPhoto: user?.userProfilePic,
      deviceImei: acceptDevice?.deviceImei,
      deviceOrigin: "ibugthtThisSecondHand",
      devcieOwnerSecretOTP: devcieOwnerSecretOTP,
    };
    const acceptDeviceInfo = {deviceId, devicereciverEmail, transferDeviceId, newDeviceOwner, previusDeviceOwner};
    const newArray = {acceptDeviceInfo: acceptDeviceInfo, deviceIamges: deviceIamges};

    try {
      const deviceInfo = newArray;
      const response = await axios.post('http://192.168.0.154:5000/verifydeviceAccept', {deviceInfo});
  
      if (response.data.acknowledged) {
        alert('Check your email');
        navigation.navigate('Home');
      } else {
        alert('Device Add Failed');
      }
  
    } catch (error) {
      console.error('Error during DeviceAccept:', error);
      alert('Device Add Failed');
      isAccepetDevcieProcesing(false);
    } finally {
      setLoading(false);
      isAccepetDevcieProcesing(false);
    }
  };
  
