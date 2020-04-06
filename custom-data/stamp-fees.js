const stampFees = {
  "Andhra Pradesh": (val) => Number(val)*.00005 > 50 ? 50 : Number(val)*.00005,
  "Arunach Pradesh": (val) => Number(val)*.00003,
  "Assam": (val) => Number(val)*.00018 > 49.5 ? 49.5 : Number(val)*.00018,
  "Bihar": (val) => Number(val)*.00003,
  "Chattisgarh": (val) => Number(val)*.00003,
  "Delhi": (val) => Number(val)*.00002,
  "Goa": (val) => Number(val)*.00005,
  "Gujarat": (val) => Number(val)*.00002,
  "Haryana": (val) => Number(val)*.00002 > 200 ? 200 : Number(val)*.00002,
  "Himachal Pradesh": (val)=> 50,/* how do I implement 50 per day?! */
  "Jammu and Kashmir": 20,
  "Jharkhand": (val) => Number(val)*.00003,
  "Karnataka": (val) => Number(val)*.00003,
  "Madhya Pradesh": (val) => Number(val)*.00002,
  "Maharashtra":(val) => Number(val)*.00002,
  "Meghalaya": (val) => Number(val)*.00003,
  "Mizoram": (val) => Number(val)*.00003,
  "Nagaland": (val) => Number(val)*.00003,
  "Orissa":  (val) => Number(val)*.00005 > 50 ? 50 : Number(val)*.00005,
  "Rajasthan": (val) => Number(val)*.00003,
  "Punjab": (val) => Number(val)*.00003,
  "Sikkim": (val) => Number(val)*.00003,
  "Tamil nadu": (val) => Number(val)*.00006,
  /* This is supposed to be a cap of 100 per day. Same question as above. */
  "Telangana": (val) => Number(val)*.00001 > 100 ? 100 : Number(val)*.00005,
  "Tripura": (val) => Number(val)*.00003,
  /* This is supposed to be a cap of 1000 per day. Same question as above. */
  "Uttar Pradesh":  (val) => Number(val)*.00002 > 1000 ? 1000 : Number(val)*.00005, 
  "Uttarakhand": (val) => Number(val)*.00003,
  "West Bengal":(val) => Number(val)*.00002,
  "Other": (val) => Number(val)*.00003,
};

export default stampFees;