
// ================================================================
// GET INCIDENTS CONTROLLER
// ================================================================

import { Request, Response, NextFunction } from 'express';

import { getIncidentsService } from '../../services/incidentServices/getIncident.service.js';

import {
  IncidentFilter,
  IncidentSeverity,
  IncidentStatus,
} from '../../types/index.js';


// ================================================================
// GET ALL INCIDENTS
// GET /api/incidents
// ================================================================

export const getIncidentsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {

  try {


    // ------------------------------------------------
    // STEP 1
    // Request se filters lena
    // ------------------------------------------------

    const filters = {

      severity: req.query.severity as IncidentSeverity | undefined,

      status: req.query.status as IncidentStatus | undefined,

      startDate: req.query.startDate
       ? new Date(req.query.startDate as string)
       : undefined,

      endDate: req.query.endDate
       ? new Date(req.query.endDate as string)
       : undefined,

      sort: req.query.sort as IncidentFilter["sort"] | undefined,

      order: req.query.order as IncidentFilter["order"] | undefined,

    };

    // get pagination 
    const pagination = req.pagination;

    // ------------------------------------------------
    // STEP 2
    // Service call
    // ------------------------------------------------

    const incidents = await getIncidentsService(filters, pagination);



    // ------------------------------------------------
    // STEP 3
    // Response
    // ------------------------------------------------

    res.status(200).json({

      success: true,

      message: 'Incidents fetched successfully.',

      data: incidents,

    });


  } catch(error){

    next(error);

  }

};