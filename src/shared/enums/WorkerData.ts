export type CreateWorker = {
    lastName: string,
    name: string,
    institutionName: string,
    position: string,
    academicRank: string,
    isScholar: boolean,
    isOrcid: boolean,
    isScopus: boolean,
}

export type Worker = {
    id: number,
    lastName: string,
    name: string,
    institutionName: string,
    position: string,
    academicRank: string,
    works: Work[],
    isScholar: boolean,
    isOrcid: boolean,
    orcid_id: string,
    isScopus: boolean,
}

export type Work = {
    website_name: string,
    data: WorkData[],
}

export type WorkData = {
    title: string,
    journal_title: string,
    publication_date: string,
    source: string,
}