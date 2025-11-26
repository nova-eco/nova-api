import { routerOptions } from '@app/config';
import {
  CompanyBookingCompletionRequirementModel,
  CompanyModel,
  ProductModel,
  ServiceBookingCompletionRequirementModel,
  ServiceModel,
} from '@app/models';
import { Router } from 'express';

export const serviceRouterPostHaircut = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const companyModel = new CompanyModel();
      const companyBookingCompletionRequirementModel =
        new CompanyBookingCompletionRequirementModel();
      const serviceModel = new ServiceModel();
      const serviceBookingCompletionRequirementModel =
        new ServiceBookingCompletionRequirementModel();
      const productModel = new ProductModel();

      const { body } = req;
      const { companyId, description, name } = body;

      if (companyId === null) {
        throw new Error('companyId: not found');
      }

      const company = await companyModel.findByPk(companyId);

      if (company === null) {
        throw new Error('company: not found');
      }

      let product = await productModel.findOne({
        description,
        name,
      });

      if (product === null) {
        product = await productModel.create({
          description,
          name,
        });
      }

      if (product === null) {
        throw new Error('haircutRouterPostHaircut: product: null');
      }

      const { id: productId } = product;
      const potentialDuplicateService = await serviceModel.count({
        companyId,
        productId,
      });

      if (potentialDuplicateService > 0) {
        throw new Error('potentialDuplicateService');
      }

      const service = await serviceModel.create({
        companyId,
        productId,
      });

      if (service === null) {
        throw new Error('service: not created');
      }

      const { id: serviceId } = service;

      const completionRequirements =
        await companyBookingCompletionRequirementModel.findAll({
          where: {
            companyId,
          },
        });

      const haircutBookingCompletionRules = [];

      if (completionRequirements.length > 0) {
        for (const completionRequirement of completionRequirements) {
          const completionRequirementId =
            typeof completionRequirement['id'] !== 'undefined'
              ? completionRequirement['id']
              : null;

          if (completionRequirementId === null) {
            throw new Error(
              'serviceRouterPostService: completionRequirementId: not found',
            );
          }

          const productCompletionRequirement =
            await serviceBookingCompletionRequirementModel.create({
              serviceId,
              companyBookingCompletionRequirementId: completionRequirementId,
            });

          if (productCompletionRequirement === null) {
            throw new Error(
              'serviceRouterPostService: productCompletionRequirement: not created',
            );
          }

          haircutBookingCompletionRules.push(productCompletionRequirement);
        }
      }

      const response = {
        id: service.id,
        seatIds: [],
        companyId,
        description,
        haircutBookingCompletionRuleIds: haircutBookingCompletionRules.map((h) => h.id),
        haircutPriceIds: [],
        haircutStageIds: [],
        name,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
);
