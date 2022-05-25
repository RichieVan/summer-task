function getClassList(baseClass: string, mods: string[] = []): string {
  const classArray = [baseClass];
  return classArray
    .concat(mods.map((mod: string) => `${baseClass}_${mod}`))
    .join(' ');
}

export default getClassList;
