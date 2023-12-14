import { schemaMigrations, createTable } from '@nozbe/watermelondb/Schema/migrations'
import { version } from 'react'

export default schemaMigrations({
  migrations: [{ toVersion:2, steps: [] }],
})