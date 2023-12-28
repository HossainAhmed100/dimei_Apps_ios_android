
const OwnerTransferInvoice = (deviceOwnerData, reciverOwnerSign, reciverOwnerData, deviceOwnerSign, transDevcieInfo, invoiceId) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500&display=swap" rel="stylesheet">
  </head>
  <body style="font-family: 'Hind Siliguri', sans-serif; padding-left: 2rem; padding-right: 2rem; padding-top: 20px;">
    <div style="min-height: auto; width: 100%; height : 97vh;">
    <div style="height: auto; width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center;">
    <div>
        <div style="display: flex; flex-direction: column; align-items: flex-start; font-size: 2rem;">
            PhoneBik.com<br>
        </div>
        <div style=" display: flex; flex-direction: column; align-items: flex-start;">
            OwnerShip Transfer invoice #${invoiceId}
        </div>
    </div>
    <img style="height: 90px; width: 90px; margin-right:15px; border-radius: 10px" src="https://i.ibb.co/K9Fz2Xr/icon.png" />
    </div>
    <div style="padding-top: 1rem;">
        <h5 style="margin: 0;">User Info</h5>
        <hr/>
    </div>
    <div style="height: auto;width: 100%;display: flex;flex-direction: row; align-items: center; justify-content: space-between; gap: 10">
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 5;">
        <img style="height: 140px; width: 90px; margin-right:15px;border-radius: 4px; object-fit: cover;object-position: center;" src=${deviceOwnerData?.userProfilePic} />
        <div>
            <p style="font-size: 14px;">
                আমি (বিক্রেতা) <br>
                মো: ${deviceOwnerData?.nameinBangla},
                পিতা মো: ${deviceOwnerData?.niduserfathersname} <br>
                মোবাইল নম্বর : ${deviceOwnerData?.userPhone}<br>
                থানা: ${deviceOwnerData?.town}, জেলা: ${deviceOwnerData?.city}<br>
                গ্রাম/ব্লক: ${deviceOwnerData?.villageBlock}, ইউনিয়ন/ওয়ার্ড : ${deviceOwnerData?.unionWard}<br>
                ভোটার আইডি কার্ড নং: ${deviceOwnerData?.nidnumber}
            </p>
        </div>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 5;">
        <img style="height: 140px; width: 90px; margin-right:15px; border-radius: 4px; object-fit: cover;object-position: center;" src=${reciverOwnerData?.userProfilePic} />
        <div>
                <p style="font-size: 14px;">
                আমি (ক্রেতা) <br>
                মো: ${reciverOwnerData?.nameinBangla},
                পিতা মো: ${reciverOwnerData?.niduserfathersname} <br>
                মোবাইল নম্বর : ${reciverOwnerData?.userPhone}<br>
                থানা: ${reciverOwnerData?.town}, জেলা: ${reciverOwnerData?.city}<br>
                গ্রাম/ব্লক: ${reciverOwnerData?.villageBlock}, ইউনিয়ন/ওয়ার্ড : ${reciverOwnerData?.unionWard}<br>
                ভোটার আইডি কার্ড নং: ${reciverOwnerData?.nidnumber}
            </p>
        </div>
    </div>
    </div>
    <div style="padding-top: 1rem;">
        <h5 style="margin: 0;">Notice</h5>
        <hr/>
    </div>
    <div style="height:auto;">
       <p>
        আমি (বিক্রেতা : মো: ${deviceOwnerData?.nameinBangla}) আমার এই মডেল এর মোবাইলটি <br>
        ------------------------------------------------------------ <br>
        ${transDevcieInfo?.deviceModelName} <br>
        Brand: ${transDevcieInfo?.brand}  <br>
        IMEI 01: ${transDevcieInfo?.deviceImei}  <br>
        RAM: ${transDevcieInfo?.ram} ROM: ${transDevcieInfo?.storage} <br>
        ------------------------------------------------------------ <br>
        (ক্রেতা) মো: ${reciverOwnerData?.nameinBangla} এর কাছে বিক্রি করলাম  <br>
        মোবাইল এ যদি কোনো প্রকার মামলা অথবা মোবাইল চুরির হয়ে থাকে তাহলে  <br>
        আমি (বিক্রেতা : মো: ${deviceOwnerData?.nameinBangla}) এর সকল প্রকার দায়বার গ্রহণ করিয়া নিব এবং <br>
        মোবাইলের সম্পুর্ন টাকা ফেরত প্রদান করিব।
       </p>
    </div>
    <div style="height:auto;">
        <p>
            সময় : ${transDevcieInfo?.formattedDayTime} <br>
            তারিখ : ${transDevcieInfo?.formattedDate} <br>
            এস্থান : ${transDevcieInfo?.address} <br>
        </p>
    </div>
    <div style="height:auto; padding-top: 30px;">
        <div style="flex-direction: row; align-items: center; justify-content: space-between; display: flex;">
            <div style="text-align: center; flex-direction: column; align-items: center; justify-content: center; gap:5px; display: flex">
            <img style="height: 50px; width: 100px; border-radius: 4px; border-width: 1px solid black," src=${deviceOwnerSign} />
            <span>-------------------------------</span>
            <span>বিক্রেতার স্বাক্ষর</span>
        </div>
        <div style="text-align: center; flex-direction: column; align-items: center; justify-content: center; gap:5px; display: flex">
            <img style="height: 50px; width: 100px; border-radius: 4px" src=${reciverOwnerSign} />    
            <span>-------------------------------</span>
            <span>ক্রেতার স্বাক্ষর</span>
        </div>
    </div>
    </div>
    </div>
  </body>
</html>
`;

export { OwnerTransferInvoice };