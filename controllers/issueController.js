const { v4: uuidv4 } = require("uuid");
const Issue = require("../models/issueModel");
const getISTTimestamp = require("../middleware/middleWare"); // Import the utility function

// Controller function to get issues that are not completed
const getOpenIssues = async (req, res) => {
  try {
    const incompleteIssues = await Issue.find({ completed: false }) .sort({ timestamp: -1 });; // Query for issues with completed: false

    // Standardized response format
    res.status(200).json({
      success: true,
      message: "Fetched incomplete issues successfully",
      data: {
        issues: incompleteIssues,
        count: incompleteIssues.length, // Include the count of issues
      },
    });
  } catch (error) {
    console.error(`Error fetching incomplete issues: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message, // Optionally include the error message for debugging
    });
  }
};

const getPrivateCompletedIssues = async (req, res) => {
  try {
    // Fetch all issues without filtering by completion status
    const allIssues = await Issue.find({}).sort({ timestamp: -1 });;
    res.status(200).json({
      success: true,
      message: "Fetched all issues successfully",
      data: {
        issues: allIssues,
        count: allIssues.length,
      },
    });
  } catch (error) {
    console.error(`Error fetching issues: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const addIssue = async (req, res) => {
    try {
        const { title, description, application, subtitle, completed, userId } = req.body;

        const newIssue = new Issue({
            _id: uuidv4().substring(0, 8),
            title,
            description,
            application,
            statuses: [{ 
                subtitle, 
                description, 
                timestamp: getISTTimestamp()
                // Remove _id from status
            }],
            userId: userId,
            timestamp: getISTTimestamp(),
            completed: completed !== undefined ? completed : false,
        });

        await newIssue.save();

        res.status(200).json({
            success: true,
            message: "Issue added successfully",
            data: newIssue,
        });
    } catch (error) {
        console.error(`Error adding issue: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

const addStatusToIssue = async (req, res) => {
  try {
    const { issueId } = req.params; // Get the issue ID from the request parameters
    const { subtitle, description } = req.body; // Extract subtitle and description from the request body

    // Find the issue by ID and update the statuses array
    const updatedIssue = await Issue.findByIdAndUpdate(
      issueId,
      {
        $push: {
          statuses: {
            subtitle,
            description,
            timestamp: getISTTimestamp(), // Use the utility function for timestamp
          },
        },
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedIssue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status added successfully",
      data: updatedIssue, // Return the updated issue
    });
  } catch (error) {
    console.error(`Error adding status to issue: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const deleteIssue = async (req, res) => {
    try {
        const { issueId } = req.params;  // Get the issue ID from URL parameters

        // Find and delete the issue
        const deletedIssue = await Issue.findByIdAndDelete(issueId);

        // If no issue was found with that ID
        if (!deletedIssue) {
            return res.status(404).json({
                success: false,
                message: "Issue not found"
            });
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: "Issue deleted successfully",
            data: deletedIssue
        });

    } catch (error) {
        console.error(`Error deleting issue: ${error.message}`);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
  getOpenIssues,
  getPrivateCompletedIssues,
  addIssue,
  addStatusToIssue,
  deleteIssue
 
};
