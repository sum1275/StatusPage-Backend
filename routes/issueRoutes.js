const express = require("express");
const {
  getOpenIssues,
  getPrivateCompletedIssues,
  addIssue,
  addStatusToIssue,
  deleteIssue
} = require("../controllers/issueController");
const {validateAddIssue,validateAddStatus} = require("../middleware/issueValidation");
const router = express.Router();

// Route to get incomplete issues
router.get("/", getOpenIssues);

// Route to get completed issues
router.get("/allIssues", getPrivateCompletedIssues); 
router.post("/issues", validateAddIssue, addIssue);
router.post("/issues/:issueId", validateAddStatus, addStatusToIssue);
router.delete('/issues/:issueId', deleteIssue);
module.exports = router;
// Example of Endpoints
//localhost:5000/api/status/issues