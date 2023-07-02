import { z } from 'zod';

export const DATASET_LICENSE_ENUM = z.enum([
    'none',
    'cc0-4.0',
    'cc-by-4.0',
    'cc-by-sa-4.0',
    'cc-by-nc-4.0',
    'cc-by-nc-sa-4.0',
    'cc-by-nd-4.0',
    'cc-by-nc-nd-4.0',
]);
export type _DatasetLicense = z.infer<typeof DATASET_LICENSE_ENUM>;
export const DATASET_LICENSE_DESCRIPTION: Record<_DatasetLicense, string> = {
    none: 'All rights reserved',
    'cc0-4.0': 'Creative Commons Zero - Public domain',
    'cc-by-4.0': 'Creative Commons Attribution 4.0 International',
    'cc-by-nd-4.0': 'Creative Commons Attribution-NoDerivatives 4.0 International',
    'cc-by-sa-4.0': 'Creative Commons Attribution-ShareAlike 4.0 International',
    'cc-by-nc-4.0': 'Creative Commons Attribution-NonCommercial 4.0 International',
    'cc-by-nc-nd-4.0': 'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International',
    'cc-by-nc-sa-4.0': 'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International',
};
