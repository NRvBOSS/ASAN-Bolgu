export const activityLimits = {
  Yön2: 1,
  Yön3: 1,
  Sorğu: 3, // default
  VAQ: 2,
  Bağça: 1
}

export function canBeAssigned(volunteer, activity, childCount = 5) {
  if (!volunteer || !activity) return false;
  
  const history = Array.isArray(volunteer.history) ? volunteer.history : [];
  const count = history.filter(h => h === activity).length;

  const limit = {
    ...activityLimits,
    Sorğu: childCount < 10 ? 3 : 2
  }[activity];

  return count < (limit || 0);
}

export function isLastStanding(volunteer) {
  if (!volunteer || !Array.isArray(volunteer.history)) return false;
  return ['Sorğu', 'Yön2', 'Yön3'].includes(volunteer.history.at(-1));
}

export function isStanding(activity) {
  return ['Sorğu', 'Yön2', 'Yön3'].includes(activity);
}

export function isSitting(activity) {
  return ['VAQ', 'Bağça', 'Masa'].includes(activity);
}

export function shuffle(array) {
  if (!Array.isArray(array)) return [];
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}