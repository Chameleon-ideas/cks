import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('feedback_questions').insert([
      {
        id: '1',
        created_by_id: '2',
        question: 'How satisfied were you with the quality of the service provided?',
        slug: 'question_a',
        created_at: new Date(),
      },
      {
        id: '2',
        created_by_id: '2',
        question: 'Was the contractor professional and communicative throughout the project?',
        slug: 'question_b',
        created_at: new Date(),
      },
      {
        id: '3',
        created_by_id: '2',
        question: 'Did the service meet your expectations and timeline? If not, what could be improved?',
        slug: 'question_c',
        created_at: new Date(),
      },
      {
        id: '4',
        created_by_id: '2',
        question: 'Would you recommend our services to others? Why or why not?',
        slug: 'question_d',
        created_at: new Date(),
      },
    ])
  }
}
