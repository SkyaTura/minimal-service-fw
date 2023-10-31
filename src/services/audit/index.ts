const db = {}
export default defineService(() => ({
  _activeDoc: { value: null },
  start(meta) {
    if (this._activeDoc.value) return
    const doc = {
      id: Symbol('audit-doc'),
      meta: {
        createdAt: new Date(),
        ...meta,
      },
      events: [],
    }
    db[doc.id] = doc
    this._activeDoc.value = doc.id
  },
  update(event) {
    if (!this._activeDoc.value) return
    const doc = db[this._activeDoc.value]
    doc.events.push({
      createdAt: new Date(),
      ...event,
    })
  },
  report() {
    const doc = db[this._activeDoc.value]
    if (!doc) {
      console.log('No active audit doc')
      return
    }
    console.log('Audit report:')
    console.log(`  Meta:`, doc.meta)
    console.log(`  Events:`, doc.events)
  }
}))
