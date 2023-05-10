if (!localStorage.getItem('startDate')) {
    localStorage.setItem('startDate', new Date().toISOString());
}

if (!localStorage.getItem('currentSeed')) {
    localStorage.setItem('currentSeed', '11')
}
