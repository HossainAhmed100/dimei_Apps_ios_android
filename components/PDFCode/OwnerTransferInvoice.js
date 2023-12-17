
const OwnerTransferInvoice = () => `
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
            OwnerShip Transfer invoice
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
        <img style="height: 140px; width: 90px; margin-right:15px;border-radius: 4px" src="https://i.ibb.co/9sm5Y9t/329413355-1127951397871370-7922564190006557504-n.jpg" />
        <div>
            <p style="font-size: 14px;">
                আমি (বিক্রেতা) <br>
                মো: ইয়াসিন সরকার,
                পিতা মো: ইউনুছ আলি 
                গ্রাম/ব্লক: ময়মনসিংহ, ইউনিয়ন/ওয়ার্ড : ৪ং<br>
                থানা: সদর, জেলা: ময়মনসিংহ
                ভোটার আইডি কার্ড নং: 453794852946<br>
                মোবাইল নম্বর : 01800000000
            </p>
        </div>
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 5;">
        <img style="height: 140px; width: 90px; margin-right:15px; border-radius: 4px" src="https://i.ibb.co/MZjwcZx/355132375-947562279835069-1334785686561488687-n.jpg" />
        <div>
            <p style="font-size: 14px;">
                আমি (ক্রেতা) <br>
                মো: ইয়াসিন সরকার,
                পিতা মো: ইউনুছ আলি 
                গ্রাম/ব্লক: ময়মনসিংহ, ইউনিয়ন/ওয়ার্ড : ৪ং<br>
                থানা: সদর, জেলা: ময়মনসিংহ
                ভোটার আইডি কার্ড নং: 453794852946<br>
                মোবাইল নম্বর : 01800000000
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
        আমি (বিক্রেতা : মো: ইয়াসিন সরকার) আমার এই মডেল এর মোবাইলটি <br>
        ------------------------------------------------------------ <br>
        Samsung Galaxy A20 <br>
        IMEI 01: 83038393831930  <br>
        IMEI 02: 949794964694854949  <br>
        RAM: 4GB ROM: 128GB <br>
        ------------------------------------------------------------ <br>
        (ক্রেতা) মো: হুসাইন আহমেদ এর কাছে বিক্রি করলাম  <br>
        মোবাইল এ যদি কোনো প্রকার মামলা অথবা মোবাইল চুরির হয়ে থাকে তাহলে  <br>
        আমি (বিক্রেতা : মো: ইয়াসিন সরকার) এর সকল প্রকার দায়বার গ্রহণ করিয়া নিব এবং <br>
        মোবাইলের সম্পুর্ন টাকা ফেরত প্রদান করিব।
       </p>
    </div>
    <div style="height:auto;">
        <p>
            সময় :Friday 11:00 PM <br>
            তারিখ : 11/12/2023 <br>
            এস্থান : Dhaka, Bangladesh <br>
        </p>
    </div>
    <div style="height:auto; padding-top: 40px;">
        <div style="flex-direction: row; align-items: center; justify-content: space-between; display: flex;">
            <div style="text-align: center;">
                <p>-----------------------------</p>
                <p>বিক্রেতার স্বাক্ষর</p>
            </div>
            <div style="text-align: center;">
                <p>-----------------------------</p>
                <p>বিক্রেতার স্বাক্ষর</p>
            </div>
        </div>
    </div>
    </div>
  </body>
</html>
`;

const style = `
    .container {
      margin : 15px;
      border : solid 2px #000
    }
`;

export { OwnerTransferInvoice };