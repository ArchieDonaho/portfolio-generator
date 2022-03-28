const profiledataArgs = process.argv.slice(2, process.argv.length);

const printProfileData = profileDataArr => {
    //this...
    for(let i=0; i<profileDataArr.length; i++){
        console.log(profileDataArr[i]);
    }

    console.log('================');

    //is the same as...
    profileDataArr.forEach(profileItem => console.log(profileItem));

}

printProfileData(profiledataArgs);