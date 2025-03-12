import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName, // Ensure the field name matches the model
      userId: req.id, // Ensure the userId is correctly set from the middleware
    });

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(400).json({
        message: "No company found",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findOne({ _id: companyId });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!company) {
      return res.status(400).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};