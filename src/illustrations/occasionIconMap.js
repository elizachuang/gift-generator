import { Balloon, House, Rattle, Suitcase, Tree } from './OccasionIcons.jsx'

// Which icon goes with which occasion. Keyed by the occasion ids in src/data/options.js.
export const OCCASION_ICONS = {
  birthday: Balloon,
  'baby-shower': Rattle,
  farewell: Suitcase,
  housewarming: House,
  christmas: Tree,
}
