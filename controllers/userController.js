const express = require("express");

exports.getAllUsers = (req, res) => {
  // Simulate data (replace this with your actual data retrieval logic)
  res.status(200).json({
    status: "success",
    results: users.length,
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
  res.end();
};

exports.getUser = (req, res) => {
  console.log(req.params);

  const filteredUsers = users.find((el) => {
    return el.id === parseInt(req.params.id);
  });
  if (!filteredUsers) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      filteredUsers,
    },
  });
};
exports.updateUser = (req, res) => {
  const foundUser = users.find((el) => el.id === parseInt(req.params.id));
  console.log(parseInt(req.params));
  if (!foundUser) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    message: "successfully updated",
    data: {
      user: "<updated data here>",
    },
  });
};

exports.createUser = (req, res) => {
  console.log(req.body);
  const newID = users[users.length - 1].id + 1;

  //object assing let us merge 2 objects
  const newUSer = Object.assign({ id: newID }, req.body);

  users.push(newUSer);
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(users), (err) => {
    //201 means it is created- almost same as 200
    res.status(201).json({
      status: "success",
      data: {
        users: users,
      },
    });
  });
};
