import { FeatureRule } from './FeatureRules';
export interface SurveyRuleDto {
  project_id: string;
  feature_rules: FeatureRule[];
  is_activated: boolean;
  delay_to_answer: number;
}
