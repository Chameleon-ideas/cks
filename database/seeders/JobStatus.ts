import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('job_statuses').insert([
      {
        id: '1',
        title: 'Contractor Pending',
        slug: 'contractor_pending',
        color: '#d39e00',
        description: 'Waiting for Contractor Approve',
        created_at: new Date(),
      },
      {
        id: '2',
        title: 'Admin Pending',
        slug: 'admin_pending',
        color: '#00c5dc',
        description: 'Waiting for Admin Approve',
        created_at: new Date(),
      },
      {
        id: '3',
        title: 'Contractor Cancel',
        slug: 'contractor_cancel',
        color: '#f4516c',
        description: 'Contractor has cancel the job',
        created_at: new Date(),
      },
      {
        id: '4',
        title: 'Admin Cancel',
        slug: 'admin_cancel',
        color: '#f4516c',
        description: 'Admin has cancel the job',
        created_at: new Date(),
      },
      {
        id: '5',
        title: 'In-Progress',
        slug: 'in_progress',
        color: '#F6BB42',
        description: 'Admin has approve the job',
        created_at: new Date(),
      },
      {
        id: '6',
        title: 'Complete',
        slug: 'complete',
        color: '#7bcb4d',
        description: 'Admin has complete the job',
        created_at: new Date(),
      },
      {
        id: '7',
        title: 'Crew Assign',
        slug: 'crew_assign',
        color: '#967ADC',
        description: 'Admin assign to crew the job',
        created_at: new Date(),
      },
    ])
  }
}
