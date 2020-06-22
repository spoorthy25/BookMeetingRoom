//sort the rooms based on the location
export const sortLocationData = data => {
    data.sort((a, b)=> {return Number(b.level-a.level)})
    return data

};

//sort the rooms based on the availability
export const sortAvailabilityData = (data,hour,minute )=> {
  for(let i =0 ; i< data.length;i++){
      var availability = []
      let selectedTime = hour+":"+minute
      for(let key in data[i].availability){
          if(key == selectedTime ){
               data.sort((a, b)=> {return Number(b.availability[key]-a.availability[key])})
          }
      }
  }
  return data
};

//sort the rooms based on the capacity
export const sortCapacityData = data => {
  data.sort((a, b)=> {return Number(a.capacity-b.capacity)})
  return data
};
