import {assertStringNotEmpty} from '@eviljs/std-lib/assert'
import {Db, ReadResult} from '..'
import {Session} from './Session'

export async function getSessionByToken(db: Db<GetSessionByTokenServices>, token: string) {
    assertStringNotEmpty(token, 'token')

    const $Session = db.Session ?? Session
    const query = [
        `SELECT *
            FROM \`${$Session.Table}\`
            WHERE token = ?
            LIMIT 1
        `, [token]
    ] as const
    const result = await db.query(...query) as ReadResult
    if (result.length !== 1) {
        return
    }
    const model = $Session.fromData(result[0])

    return model
}

// Types ///////////////////////////////////////////////////////////////////////

export type GetSessionByTokenServices = {
    Session?: Session
}