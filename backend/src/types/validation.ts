export interface ValidationDetails {
  format_check: 'Valid' | 'Invalid';
  photo_match: 'Likely' | 'Suspicious' | 'Not Available';
  final_status: 'Valid' | 'Suspicious' | 'Fraud';
}

export interface KycValidationResult {
  name: string;
  dob: string; // ISO date string
  document_type: string;
  document_number: string;
  validation: ValidationDetails;
  reasoning: string;
}
