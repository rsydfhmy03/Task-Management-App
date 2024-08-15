let currentId = 0;

const generateSimpleIdProject = () => {
  currentId += 1;
  return `P${currentId}`;
};

const generateSimpleIdTask = () => {
  currentId += 1;
  return `T${currentId}`;
};

module.exports = { generateSimpleIdProject, generateSimpleIdTask };
