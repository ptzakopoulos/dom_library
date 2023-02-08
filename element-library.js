export const Dom = () => {
  //Taking Body's Children as first elements
  let domElement = [...document.body.children];

  //This is the Array where all the collected classes are going to be stored
  const classesArray = [];
  const idArray = [];
  const tagArray = [];
  let tagCheck = 1;
  let i = 0;
  let j = 0;
  let k = 0;

  //This is the function responsible for each children's classes,ids,tag collection
  const classes = (e) => {
    //Getting elements' Id
    if (e.id != "" && e.id != undefined) {
      idArray[j] = e.id;
      j++;
    }

    //Checking for duplicate stored classes + Stores new class
    for (const el of e.classList) {
      const check = classesArray.findIndex((e) => e == el);
      if (check < 0) {
        classesArray[i] = el;
        i++;
      }
    }

    //Checking for duplicate tags + store dom available tags
    if (tagArray.length <= 0) {
      tagArray[k] = e.tagName.toLowerCase();
      k++;
    } else {
      tagCheck = tagArray.findIndex((event) => event == e.tagName);
    }

    if (tagCheck < 0) {
      tagArray[k] = e.tagName.toLowerCase();
      k++;
    }

    //If the children of the element we have gotten have more children
    //Then run the same process again for their children, and so on...
    if (e.children.length > 0 && childrenCollector != undefined) {
      domElement = [...e.children];
      childrenCollector();
    }
  };

  //Running the Class Collector for each of the children taken every time
  const childrenCollector = function () {
    domElement.forEach((e) => {
      classes(e);
    });
  };

  //Calling ChildrenCollector for the first time
  childrenCollector();

  const classesObject = {};

  //Creating the final object for Tags
  tagArray.forEach((e) => {
    classesObject[`${e}`] = document.getElementsByTagName(`${e}`);
  });

  //Creating the final object for classes
  classesArray.forEach((e) => {
    const splitter = e.split("-");
    let attribute = "";
    splitter.forEach((split, index) => {
      if (index > 0) {
        const splice = [...split];
        splice[0] = splice[0].toUpperCase();
        split = splice.join("");
      }
      attribute += split;
    });
    classesObject[`${attribute}`] = document.getElementsByClassName(`${e}`);
  });

  //Creating the final object for ids
  idArray.forEach((e) => {
    const splitter = e.split("-");
    let attribute = "";
    splitter.forEach((split, index) => {
      if (index > 0) {
        const splice = [...split];
        splice[0] = splice[0].toUpperCase();
        split = splice.join("");
      }
      attribute += split;
    });
    classesObject[`${attribute}`] = document.getElementById(`${e}`);
  });

  return classesObject;
};
