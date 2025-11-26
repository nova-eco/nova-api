import { routerOptions } from '@app/config';
import { CompanyStaffRoleModel, StaffModel, UserModel } from '@app/models';
import { Router } from 'express';

export const staffRouterPatchStaff = Router(routerOptions).patch(
  '/',
  async (req, res, next) => {
    try {
      const companyStaffRoleModel = new CompanyStaffRoleModel();
      const staffModel = new StaffModel();
      const userModel = new UserModel();
      const { body, params } = req;

      let shouldUpdateUser = false;

      const staffId = typeof params['staffId'] !== 'undefined' ? params['staffId'] : null;

      if (staffId === null) {
        throw new Error('staffRouterPatchStaff: staffId: not found');
      }

      const staff = await staffModel.findWithAccountAndUser(staffId);

      if (staff === null) {
        throw new Error('staffRouterPatchStaff: staff: not found');
      }

      const {
        staffId: id,
        companyStaffRoleId,
        accountId,
        companyId,
        userId,
        username,
        forename,
        surname,
      } = staff;

      /*
       * staffRoleId
       */
      const staffRoleId =
        typeof body['staffRoleId'] !== 'undefined' ? body['staffRoleId'] : null;

      let updatedCompanyStaffRoleId = companyStaffRoleId;

      if (staffRoleId !== null && staffRoleId !== companyStaffRoleId) {
        const staffRole = await companyStaffRoleModel.findByIdAndCompany(
          staffRoleId,
          companyId,
        );

        if (staffRole === null) {
          throw new Error('staffRouterPatchStaff:  staffRole: not found');
        }

        await staffModel.updateStaffRole(staffId, staffRoleId);
        updatedCompanyStaffRoleId = staffRoleId;
      }

      /*
       * username
       */
      const newUsername =
        typeof body['username'] !== 'undefined' ? body['username'] : null;
      let updatedUsername = username;

      if (newUsername !== null && newUsername !== username) {
        const potentiallyDuplicateUsername = await userModel.count({
          username: newUsername,
        });

        if (potentiallyDuplicateUsername > 0) {
          throw new Error('staffRouterPatchStaff:  username: duplicate');
        }

        updatedUsername = newUsername;
        shouldUpdateUser = true;
      }

      /*
       * forename
       */
      const newForename =
        typeof body['forename'] !== 'undefined' ? body['forename'] : null;
      let updatedForename = forename;

      if (newForename !== null && newForename !== forename) {
        updatedForename = newForename;
        shouldUpdateUser = true;
      }

      /*
       * surname
       */
      const newSurname = typeof body['surname'] !== 'undefined' ? body['surname'] : null;
      let updatedSurname = surname;

      if (newSurname !== null && newSurname !== surname) {
        updatedSurname = newSurname;
        shouldUpdateUser = true;
      }

      if (shouldUpdateUser === true) {
        await userModel.updateUserDetails(
          userId,
          updatedUsername,
          updatedForename,
          updatedSurname,
        );
      }

      const userEmailResults = await userModel.getUserEmails(userId);

      const numEmails = userEmailResults.length;

      if (numEmails === 0) {
        throw new Error('staffRouterPatchStaff:  numEmails: 0');
      }

      const currentUserEmail = userEmailResults[0];
      const email = currentUserEmail.email;

      const response = {
        id: staffId,
        staffRoleId: updatedCompanyStaffRoleId,
        haircutIds: [],
        email,
        username: updatedUsername,
        forename: updatedForename,
        surname: updatedSurname,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
);
