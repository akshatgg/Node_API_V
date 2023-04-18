// Get loan applications by user ID
router.get('/user', async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from the JWT token
      const { page = 1, pageSize = 10 } = req.query;
      const offset = (page - 1) * pageSize;
      const loanApplications = await LoanApplication.findAndCountAll({
        where: { userId },
        offset,
        limit: pageSize,
      });
      res.status(200).json({ loanApplications });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to get loan applications.' });
    }
  });
  
  // Update loan application by ID
  router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const loanApplication = await LoanApplication.findByPk(id);
      if (!loanApplication) {
        return res.status(404).json({ message: 'Loan application not found.' });
      }
      // Only allow update of certain fields
      const { applicantName, bankName, bankIfsc, bankAccountNo, salaried, documents } = req.body;
      const dateUpdated = new Date();
      const updatedLoanApplication = await loanApplication.update({
        applicantName,
        dateUpdated,
        bankName,
        bankIfsc,
        bankAccountNo,
        salaried,
        documents,
      });
      res.status(200).json({ loanApplication: updatedLoanApplication });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update loan application.' });
    }
  });
  
  // Delete loan application by ID
  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const loanApplication = await LoanApplication.findByPk(id);
      if (!loanApplication) {
        return res.status(404).json({ message: 'Loan application not found.' });
      }
      await loanApplication.destroy();
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete loan application.' });
    }
  });
  
  module.exports = router;
  