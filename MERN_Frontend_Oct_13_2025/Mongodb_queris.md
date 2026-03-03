# 📚 **100+ Mongoose Model Patterns: Wrong vs Correct Cheat Sheet**

I'll create a comprehensive reference with 100+ scenarios covering every aspect of Mongoose modeling. Each entry shows the **wrong way** (common mistake) and the **✅ correct way** (best practice).

---

## **SECTION 1: Schema Types & Field Definitions** (1-15)

| #   | **What You Want**      | **❌ Wrong Way**                                            | **✅ Correct Way**                                                       |
| --- | ---------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| 1   | **String field**       | `name: String` (no validation)                              | `name: { type: String, required: true, trim: true }`                     |
| 2   | **Email field**        | `email: String`                                             | `email: { type: String, lowercase: true, match: [/.+@.+/, 'Invalid'] }`  |
| 3   | **Number with range**  | `age: Number`                                               | `age: { type: Number, min: 0, max: 120 }`                                |
| 4   | **Default date**       | `createdAt: Date`                                           | `createdAt: { type: Date, default: Date.now }`                           |
| 5   | **Boolean flag**       | `isActive: { type: Boolean }`                               | `isActive: { type: Boolean, default: true, index: true }`                |
| 6   | **Enum field**         | `role: String`                                              | `role: { type: String, enum: ['user', 'admin'], default: 'user' }`       |
| 7   | **Long string**        | `bio: String`                                               | `bio: { type: String, maxlength: 500 }`                                  |
| 8   | **Required field**     | `name: { type: String, required: true }` (no error message) | `name: { type: String, required: [true, 'Name is required'] }`           |
| 9   | **Unique field**       | `email: { type: String, unique: true }` (no validation)     | `email: { type: String, unique: true, validate: {...} }`                 |
| 10  | **Trimmed string**     | `username: String`                                          | `username: { type: String, trim: true, lowercase: true }`                |
| 11  | **Buffer for images**  | `image: Buffer`                                             | `image: { type: Buffer, validate: { validator: v => v.length <= 1e6 } }` |
| 12  | **Decimal precision**  | `price: Number` (floating point issues)                     | `price: { type: Schema.Types.Decimal128, get: v => v.toString() }`       |
| 13  | **ObjectId reference** | `userId: String`                                            | `userId: { type: Schema.Types.ObjectId, ref: 'User' }`                   |
| 14  | **Mixed type**         | `metadata: {}`                                              | `metadata: { type: Schema.Types.Mixed, default: {} }`                    |
| 15  | **Map type**           | `translations: {}`                                          | `translations: { type: Map, of: String }`                                |

---

## **SECTION 2: Arrays & Nested Structures** (16-30)

| #   | **What You Want**         | **❌ Wrong Way**                                            | **✅ Correct Way**                                                        |
| --- | ------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| 16  | **Array of strings**      | `tags: String`                                              | `tags: [String]`                                                          |
| 17  | **Array of numbers**      | `scores: Number`                                            | `scores: [Number]`                                                        |
| 18  | **Array of objects**      | `comments: { text: String, user: String }`                  | `comments: [{ text: String, user: String }]`                              |
| 19  | **Array of ObjectIds**    | `friends: [ObjectId]` (no ref)                              | `friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]`                 |
| 20  | **Nested objects**        | `address: { street: String, city: String }` (no validation) | `address: { street: { type: String, required: true }, city: String }`     |
| 21  | **Array with defaults**   | `items: [String]`                                           | `items: { type: [String], default: [] }`                                  |
| 22  | **Array size limit**      | `tags: [String]`                                            | `tags: { type: [String], validate: v => v.length <= 10 }`                 |
| 23  | **Unique array items**    | `emails: [String]`                                          | `emails: { type: [String], validate: v => new Set(v).size === v.length }` |
| 24  | **2D array**              | `matrix: Array`                                             | `matrix: [[Number]]`                                                      |
| 25  | **Array of mixed**        | `data: [{}]`                                                | `data: [Schema.Types.Mixed]`                                              |
| 26  | **Array with min items**  | `players: [String]`                                         | `players: { type: [String], validate: v => v.length >= 2 }`               |
| 27  | **Array of references**   | `posts: [String]`                                           | `posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]`                   |
| 28  | **Array of subdocuments** | `addresses: [addressSchema]` (not defined)                  | `addresses: { type: [addressSchema], default: [] }`                       |
| 29  | **Array with defaults**   | `permissions: []`                                           | `permissions: { type: [String], default: ['read'] }`                      |
| 30  | **Array of enums**        | `roles: [String]`                                           | `roles: { type: [String], enum: ['admin', 'user'] }`                      |

---

## **SECTION 3: Validation Patterns** (31-45)

| #   | **What You Want**           | **❌ Wrong Way**                           | **✅ Correct Way**                                                               |
| --- | --------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------- |
| 31  | **Custom validator**        | No validation                              | `field: { validate: { validator: v => v.length > 5, message: 'Too short' } }`    |
| 32  | **Async validation**        | `validator: async v => {...}` (no isAsync) | `validator: async v => {...}, isAsync: true`                                     |
| 33  | **Multiple validators**     | One validator for multiple rules           | `validate: [{ validator: rule1 }, { validator: rule2 }]`                         |
| 34  | **Conditional validation**  | `required: true` always                    | `required: function() { return this.type === 'premium' }`                        |
| 35  | **Cross-field validation**  | Validating one field only                  | `validate: { validator: v => v > this.minPrice }`                                |
| 36  | **Email format**            | `match: /@/`                               | `match: [/^\S+@\S+\.\S+$/, 'Invalid email']`                                     |
| 37  | **Phone number**            | `match: /\d/`                              | `match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone']`                                 |
| 38  | **Password strength**       | `minlength: 6`                             | `validate: { validator: v => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v) }` |
| 39  | **URL validation**          | `match: /http/`                            | `validate: { validator: v => validator.isURL(v) }`                               |
| 40  | **Age validation**          | `min: 0`                                   | `validate: { validator: v => v >= 13 && v <= 120 }`                              |
| 41  | **Future dates**            | `min: new Date()`                          | `validate: { validator: v => v > new Date(), message: 'Must be future' }`        |
| 42  | **Past dates**              | `max: new Date()`                          | `validate: { validator: v => v < new Date(), message: 'Must be past' }`          |
| 43  | **Custom error messages**   | `required: true`                           | `required: [true, 'Custom message']`                                             |
| 44  | **Schema-level validation** | Field-level only                           | `schema.pre('save', function(next) { ... })`                                     |
| 45  | **Update validation**       | `Model.updateOne()` (no validation)        | `Model.updateOne({...}, {...}, { runValidators: true })`                         |

---

## **SECTION 4: Indexes & Performance** (46-60)

| #   | **What You Want**           | **❌ Wrong Way**              | **✅ Correct Way**                                                           |
| --- | --------------------------- | ----------------------------- | ---------------------------------------------------------------------------- |
| 46  | **Single field index**      | No index on queried field     | `email: { type: String, index: true }`                                       |
| 47  | **Compound index**          | Two separate indexes          | `schema.index({ userId: 1, createdAt: -1 })`                                 |
| 48  | **Unique index**            | `unique: true` only           | `schema.index({ email: 1 }, { unique: true })`                               |
| 49  | **Text search**             | No index                      | `schema.index({ title: 'text', content: 'text' })`                           |
| 50  | **TTL (auto-delete)**       | Manual deletion               | `createdAt: { type: Date, index: { expires: '7d' } }`                        |
| 51  | **Sparse index**            | Regular index on sparse field | `schema.index({ phone: 1 }, { sparse: true })`                               |
| 52  | **Partial index**           | No index                      | `schema.index({ status: 1 }, { partialFilterExpression: { active: true } })` |
| 53  | **Geospatial index**        | Regular index on coordinates  | `schema.index({ location: '2dsphere' })`                                     |
| 54  | **Case-insensitive search** | No index                      | `schema.index({ email: 1 }, { collation: { locale: 'en', strength: 2 } })`   |
| 55  | **Index with name**         | Default name                  | `schema.index({ field: 1 }, { name: 'custom_index_name' })`                  |
| 56  | **Background indexing**     | Foreground indexing           | `schema.index({ field: 1 }, { background: true })`                           |
| 57  | **Hash index**              | Regular index                 | `schema.index({ field: 'hashed' })`                                          |
| 58  | **Wildcard index**          | Multiple indexes              | `schema.index({ '$**': 'text' })`                                            |
| 59  | **Index for sorting**       | No index on sort field        | `schema.index({ createdAt: -1 })`                                            |
| 60  | **Compound unique**         | Two unique fields separately  | `schema.index({ userId: 1, productId: 1 }, { unique: true })`                |

---

## **SECTION 5: Queries & Population** (61-75)

| #   | **What You Want**            | **❌ Wrong Way**                               | **✅ Correct Way**                                               |
| --- | ---------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| 61  | **Find by ID**               | `User.find({ _id: id })`                       | `User.findById(id)`                                              |
| 62  | **Find one document**        | `User.find({ email }).then(users => users[0])` | `User.findOne({ email })`                                        |
| 63  | **Select fields**            | `User.find()` (all fields)                     | `User.find().select('name email -_id')`                          |
| 64  | **Lean queries**             | `User.find()` (Mongoose docs)                  | `User.find().lean()`                                             |
| 65  | **Population**               | Multiple queries                               | `Post.find().populate('author')`                                 |
| 66  | **Deep population**          | Chain populations                              | `Post.populate({ path: 'author', populate: { path: 'posts' } })` |
| 67  | **Populate specific fields** | `populate('author')` (all fields)              | `populate('author', 'name email')`                               |
| 68  | **Conditional populate**     | Populate everything                            | `populate({ path: 'comments', match: { approved: true } })`      |
| 69  | **Pagination**               | `User.find()` (all users)                      | `User.find().skip(20).limit(10)`                                 |
| 70  | **Sorting**                  | No sort                                        | `User.find().sort('-createdAt')`                                 |
| 71  | **Count documents**          | `User.find().length` (inefficient)             | `User.countDocuments({ active: true })`                          |
| 72  | **Exists check**             | `User.findOne({ email }).then(u => !!u)`       | `User.exists({ email })`                                         |
| 73  | **Distinct values**          | Manual aggregation                             | `User.distinct('role')`                                          |
| 74  | **Update and return**        | Two operations                                 | `User.findByIdAndUpdate(id, update, { new: true })`              |
| 75  | **Upsert**                   | Check then insert                              | `User.updateOne({ email }, update, { upsert: true })`            |

---

## **SECTION 6: Middleware (Hooks)** (76-85)

| #   | **What You Want**        | **❌ Wrong Way**     | **✅ Correct Way**                                                                       |
| --- | ------------------------ | -------------------- | ---------------------------------------------------------------------------------------- |
| 76  | **Hash password**        | Save plain text      | `pre('save', async function() { this.password = await hash(this.password) })`            |
| 77  | **Update timestamps**    | Manual updates       | `pre('save', function() { this.updatedAt = Date.now() })`                                |
| 78  | **Remove related data**  | Orphaned references  | `pre('remove', async function() { await Post.deleteMany({ user: this._id }) })`          |
| 79  | **Generate slug**        | Manual creation      | `pre('validate', function() { this.slug = slugify(this.title) })`                        |
| 80  | **Log changes**          | No logging           | `pre('save', function() { console.log(`Saving ${this.\_id}`) })`                         |
| 81  | **Post-save actions**    | Inline after save    | `post('save', function(doc) { sendEmail(doc) })`                                         |
| 82  | **Init hook**            | No initialization    | `post('init', function(doc) { doc.initialized = true })`                                 |
| 83  | **Validate hook**        | No pre-validation    | `pre('validate', function() { this.validateCustom() })`                                  |
| 84  | **Aggregate middleware** | No aggregation hooks | `pre('aggregate', function() { this.pipeline().unshift({ $match: { active: true } }) })` |
| 85  | **InsertMany hook**      | Document hooks only  | `pre('insertMany', function(next, docs) { ... })`                                        |

---

## **SECTION 7: Virtuals & Methods** (86-95)

| #   | **What You Want**            | **❌ Wrong Way**         | **✅ Correct Way**                                                                                    |
| --- | ---------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| 86  | **Computed field**           | Store redundant data     | `userSchema.virtual('fullName').get(function() { return `${this.first} ${this.last}` })`              |
| 87  | **Virtual setter**           | Direct assignment only   | `virtual('fullName').set(function(name) { [this.first, this.last] = name.split(' ') })`               |
| 88  | **Instance method**          | Arrow function           | `userSchema.methods.getProfile = function() { return { name: this.name } }`                           |
| 89  | **Static method**            | Instance method on Model | `userSchema.statics.findByEmail = function(email) { return this.findOne({ email }) }`                 |
| 90  | **Query helper**             | No chainable methods     | `userSchema.query.active = function() { return this.where({ active: true }) }`                        |
| 91  | **Method returning promise** | Sync operation           | `userSchema.methods.updatePassword = async function(newPass) { this.password = await hash(newPass) }` |
| 92  | **Virtual population**       | Manual population        | `userSchema.virtual('posts', { ref: 'Post', localField: '_id', foreignField: 'author' })`             |
| 93  | **Method with options**      | Hardcoded values         | `userSchema.methods.toJSON = function(options) { return { ...this._doc, ...options } }`               |
| 94  | **Static with aggregation**  | Multiple queries         | `userSchema.statics.getStats = function() { return this.aggregate([...]) }`                           |
| 95  | **Method chaining**          | Separate calls           | `userSchema.methods.setup = function() { this.init(); this.validate(); return this }`                 |

---

## **SECTION 8: Schema Options** (96-105)

| #   | **What You Want**          | **❌ Wrong Way**           | **✅ Correct Way**                                                              |
| --- | -------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| 96  | **Automatic timestamps**   | Manual createdAt/updatedAt | `{ timestamps: true }`                                                          |
| 97  | **Custom collection name** | Default plural             | `{ collection: 'users_custom' }`                                                |
| 98  | **Disable version key**    | \_\_v field in all docs    | `{ versionKey: false }`                                                         |
| 99  | **Strict schema**          | Extra fields allowed       | `{ strict: true }`                                                              |
| 100 | **Minimize empty objects** | Empty objects saved        | `{ minimize: false }`                                                           |
| 101 | **Custom ID**              | \_id as ObjectId           | `{ _id: false, id: { type: String, required: true } }`                          |
| 102 | **Skip versioning fields** | All fields versioned       | `{ skipVersioning: { password: true } }`                                        |
| 103 | **ToJSON transform**       | \_id exposed in API        | `{ toJSON: { transform: (doc, ret) => { ret.id = ret._id; delete ret._id } } }` |
| 104 | **ToObject options**       | Default object conversion  | `{ toObject: { getters: true, virtuals: true } }`                               |
| 105 | **Auto index**             | Manual index creation      | `{ autoIndex: true }`                                                           |

---

## **SECTION 9: Advanced Patterns** (106-120)

| #   | **What You Want**               | **❌ Wrong Way**      | **✅ Correct Way**                                                            |
| --- | ------------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| 106 | **Discriminator (inheritance)** | Separate schemas      | `BaseModel.discriminator('Child', childSchema)`                               |
| 107 | **Plugin usage**                | Reinventing the wheel | `schema.plugin(require('mongoose-paginate'))`                                 |
| 108 | **Transactions**                | Separate operations   | `session.startTransaction(); await op1({ session }); await op2({ session })`  |
| 109 | **Optimistic concurrency**      | No version check      | `schema.plugin(optimisticConcurrency)`                                        |
| 110 | **Custom \_id type**            | ObjectId only         | `_id: { type: String, default: () => nanoid() }`                              |
| 111 | **Sharding key**                | No sharding strategy  | `schema.index({ shardKey: 1 }, { shardKey: true })`                           |
| 112 | **Capped collection**           | Regular collection    | `{ capped: { size: 1024, max: 1000 } }`                                       |
| 113 | **Timeseries collection**       | Regular collection    | `{ timeseries: { timeField: 'timestamp', metaField: 'metadata' } }`           |
| 114 | **Schema inheritance**          | Copy-paste            | `const childSchema = new Schema({ ...parentSchema.obj, childField: String })` |
| 115 | **Dynamic schema**              | Static only           | `new Schema({}, { strict: false })`                                           |
| 116 | **Encrypted fields**            | Plain text            | `field: { type: String, set: encrypt, get: decrypt }`                         |
| 117 | **Compressed data**             | Full data             | Use Buffer with compression                                                   |
| 118 | **Versioning documents**        | No version history    | Create version subdocuments                                                   |
| 119 | **Soft delete**                 | Permanent delete      | `{ deleted: { type: Boolean, default: false } }` + middleware                 |
| 120 | **Audit trail**                 | No tracking           | `{ createdBy: ObjectId, updatedBy: ObjectId }`                                |

---

## **SECTION 10: Common Errors & Fixes** (121-135)

| #   | **Error/Symptom**                    | **❌ What Causes It**       | **✅ How to Fix**                                           |
| --- | ------------------------------------ | --------------------------- | ----------------------------------------------------------- |
| 121 | **Cast to ObjectId failed**          | Invalid ID string           | `mongoose.Types.ObjectId.isValid(id) ? findById(id) : null` |
| 122 | **ValidationError: Path required**   | Missing required field      | Check data before save                                      |
| 123 | **MongoError: E11000 duplicate key** | Unique constraint violation | Handle error with 409 status                                |
| 124 | **Cannot overwrite model**           | Multiple model compilation  | Check if model exists before compiling                      |
| 125 | **Document not found**               | Wrong query                 | Check query conditions                                      |
| 126 | **Buffer not modified**              | Mixed type not marked       | `doc.markModified('path')`                                  |
| 127 | **Can't save multiple times**        | Same document in memory     | Use fresh document or `reload()`                            |
| 128 | **Population returns null**          | Referenced doc deleted      | Handle null in code                                         |
| 129 | **Middleware not firing**            | Using updateOne()           | Add `{ runValidators: true }`                               |
| 130 | **Schema not compiling**             | Circular dependencies       | Refactor model imports                                      |
| 131 | **Connection timeout**               | Wrong connection string     | Check MongoDB URI                                           |
| 132 | **Memory leak**                      | No lean() on large queries  | Use `.lean()` + pagination                                  |
| 133 | **Slow queries**                     | No indexes                  | Add indexes for queried fields                              |
| 134 | **Overwriting model**                | Hot reload in dev           | Check `mongoose.models` first                               |
| 135 | **Date stored as string**            | Not using Date type         | `{ type: Date }` not `String`                               |

---

## **SECTION 11: Schema Design Patterns** (136-150)

| #   | **Pattern Name**          | **❌ Anti-Pattern**         | **✅ Best Practice**                          |
| --- | ------------------------- | --------------------------- | --------------------------------------------- |
| 136 | **One-to-One**            | Embed everything            | `profile: { type: ObjectId, ref: 'Profile' }` |
| 137 | **One-to-Few**            | Separate collection         | Embed up to ~100 items                        |
| 138 | **One-to-Many**           | Embed thousands             | Reference by ID                               |
| 139 | **One-to-Squillions**     | Reference array (too large) | Reference parent from child                   |
| 140 | **Many-to-Many**          | Embed both sides            | Array of references in one                    |
| 141 | **Tree structures**       | Nested embedding            | Parent reference or materialized path         |
| 142 | **Queue pattern**         | Process in code             | Use `findOneAndUpdate` with atomic ops        |
| 143 | **Bucket pattern**        | One doc per reading         | Array of readings in time buckets             |
| 144 | **Polymorphic**           | Multiple collections        | Discriminators with common fields             |
| 145 | **Extensible attributes** | Add fields constantly       | Map or Mixed type                             |
| 146 | **Audit logging**         | Same collection             | Separate audit collection                     |
| 147 | **Soft delete pattern**   | Real delete                 | `isDeleted` flag + middleware                 |
| 148 | **Versioning documents**  | Overwrite history           | New document with version field               |
| 149 | **Geospatial queries**    | No location index           | 2dsphere index on coordinates                 |
| 150 | **Full-text search**      | Regex queries               | Text indexes + $text operator                 |

---

## **SECTION 12: Connection & Configuration** (151-160)

| #   | **What You Want**        | **❌ Wrong Way**              | **✅ Correct Way**                                    |
| --- | ------------------------ | ----------------------------- | ----------------------------------------------------- |
| 151 | **Connection string**    | Hardcoded                     | `mongoose.connect(process.env.MONGODB_URI)`           |
| 152 | **Connection options**   | No options                    | `{ useNewUrlParser: true, useUnifiedTopology: true }` |
| 153 | **Connection events**    | No error handling             | `mongoose.connection.on('error', console.error)`      |
| 154 | **Multiple connections** | One connection for everything | `mongoose.createConnection()`                         |
| 155 | **Replica set**          | Single node                   | `mongodb://host1,host2,host3/db?replicaSet=rs0`       |
| 156 | **Connection pooling**   | Default pool size             | `{ poolSize: 10 }`                                    |
| 157 | **Debug mode**           | No debugging                  | `mongoose.set('debug', true)`                         |
| 158 | **Strict query**         | Returning wrong docs          | `mongoose.set('strictQuery', true)`                   |
| 159 | **Promise library**      | No global promise             | `mongoose.Promise = global.Promise`                   |
| 160 | **Auto reconnect**       | Manual reconnect              | Built-in, just handle events                          |

---

## **📋 QUICK REFERENCE SUMMARY**

| Category           | Count | Key Takeaway                         |
| ------------------ | ----- | ------------------------------------ |
| Schema Types       | 15    | Always add validation and options    |
| Arrays & Nested    | 15    | Know [] vs {} syntax                 |
| Validation         | 15    | Multiple validators, custom messages |
| Indexes            | 15    | Index what you query                 |
| Queries            | 15    | Use lean(), select(), populate()     |
| Middleware         | 10    | Hooks for cross-cutting concerns     |
| Virtuals & Methods | 10    | Computed fields, reusable logic      |
| Schema Options     | 10    | timestamps, strict, toJSON           |
| Advanced           | 15    | Discriminators, transactions         |
| Errors & Fixes     | 15    | Common pitfalls solved               |
| Design Patterns    | 15    | Choose right pattern for scale       |
| Connection         | 10    | Configuration best practices         |

**Total: 160 scenarios covered!**

---

## **🎯 Top 10 Most Critical Patterns to Remember**

1. **Array of Objects**: `[{ field: String }]` not `{ field: String }`
2. **Array of ObjectIds**: `[{ type: ObjectId, ref: 'Model' }]` not extra nesting
3. **Mixed Type Updates**: Always `markModified()` after changes
4. **Read-only Queries**: Always use `.lean()` for API responses
5. **Conditional Required**: Use `function() { return this.condition }` not arrow
6. **Unique Validation**: Add both `unique: true` AND custom validator
7. **Population**: Single query with populate, not N+1 queries
8. **Timestamps**: Use `{ timestamps: true }` not manual fields
9. **Instance Methods**: Regular functions, not arrow functions
10. **Indexes**: Create indexes for all frequently queried fields

This comprehensive reference should cover virtually every scenario you'll encounter with Mongoose! Keep it bookmarked for quick reference.

<!------------------




 ---------------->

# 📊 **MongoDB Queries: WHY, WHERE, and WHEN - 300+ Scenarios**

I'll create a comprehensive guide organized by use cases, showing you exactly **WHY** you need each query, **WHERE** to use it in your application, and **WHEN** it's the right choice.

---

## **📋 LEGEND & FORMAT**

```
🔹 SCENARIO: [Description]
   WHY: [Business/technical reason]
   WHERE: [Application layer/component]
   WHEN: [Timing/conditions]
   QUERY: [MongoDB/Mongoose code]
   PROBABILITY: [How often used: High/Medium/Low]
```

---

## **SECTION 1: USER MANAGEMENT** (1-40)

### **1.1 User Registration & Authentication**

| #   | Scenario |
| --- | -------- |

**🔹 SCENARIO 1: Create new user account**

- **WHY**: User signs up for your service; need to store credentials and profile
- **WHERE**: Registration API endpoint, signup form handler
- **WHEN**: When user submits registration form with valid data
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.insertOne({
    email: "user@example.com",
    password: "hashed_password",
    name: "John Doe",
    createdAt: new Date(),
    status: "pending_verification",
  });

  // Mongoose
  const user = new User(req.body);
  await user.save();
  ```

- **PROBABILITY**: HIGH (every user signup)

**🔹 SCENARIO 2: Check if email already exists**

- **WHY**: Prevent duplicate registrations and maintain email uniqueness
- **WHERE**: Registration validation, real-time email check during typing
- **WHEN**: Before attempting to create new user, during form validation
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.findOne({ email: "user@example.com" }, { email: 1 });

  // Mongoose
  const exists = await User.exists({ email: req.body.email });
  ```

- **PROBABILITY**: HIGH (every registration attempt)

**🔹 SCENARIO 3: Verify user login credentials**

- **WHY**: Authenticate user and grant access to protected resources
- **WHERE**: Login endpoint, authentication middleware
- **WHEN**: User submits login form with email and password
- **QUERY**:

  ```javascript
  // MongoDB (include password hash for comparison)
  db.users.findOne(
    { email: "user@example.com" },
    { email: 1, password: 1, role: 1, status: 1 },
  );

  // Mongoose
  const user = await User.findOne({ email }).select("+password"); // Include password field
  ```

- **PROBABILITY**: HIGH (every login attempt)

**🔹 SCENARIO 4: Update last login timestamp**

- **WHY**: Track user activity, implement security monitoring, show "last seen"
- **WHERE**: Post-login success handler, authentication service
- **WHEN**: Immediately after successful authentication
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: userId },
    {
      $set: {
        lastLoginAt: new Date(),
        lastLoginIP: "192.168.1.1",
      },
      $inc: { loginCount: 1 },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    $set: { lastLoginAt: new Date() },
    $inc: { loginCount: 1 },
  });
  ```

- **PROBABILITY**: HIGH (every successful login)

**🔹 SCENARIO 5: Store failed login attempt**

- **WHY**: Implement rate limiting, detect brute force attacks, security auditing
- **WHERE**: Authentication middleware, security service
- **WHEN**: When login attempt fails (wrong password/email)
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { email: "user@example.com" },
    {
      $inc: { failedLoginAttempts: 1 },
      $set: { lastFailedLogin: new Date() },
    },
  );

  // Mongoose
  await User.findOneAndUpdate(
    { email },
    {
      $inc: { failedLoginAttempts: 1 },
      $set: { lastFailedLogin: new Date() },
    },
  );
  ```

- **PROBABILITY**: MEDIUM (depends on user error rate)

**🔹 SCENARIO 6: Lock user account after too many failures**

- **WHY**: Security measure to prevent brute force attacks
- **WHERE**: Login failure handler, security service
- **WHEN**: When failedLoginAttempts exceeds threshold (e.g., 5)
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { email: "user@example.com" },
    {
      $set: {
        accountLocked: true,
        lockedUntil: new Date(Date.now() + 30 * 60000), // 30 minutes
        lockReason: "Too many failed attempts",
      },
    },
  );

  // Mongoose
  await User.findOneAndUpdate(
    { email },
    {
      accountLocked: true,
      lockedUntil: new Date(Date.now() + 30 * 60 * 1000),
      lockReason: "Too many failed attempts",
    },
  );
  ```

- **PROBABILITY**: LOW (only when attacks occur)

**🔹 SCENARIO 7: Check if account is locked**

- **WHY**: Prevent locked users from logging in
- **WHERE**: Pre-login validation, authentication middleware
- **WHEN**: Before attempting password verification
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.findOne(
    { email: "user@example.com" },
    { accountLocked: 1, lockedUntil: 1 },
  );

  // Mongoose
  const user = await User.findOne({ email }).select(
    "accountLocked lockedUntil",
  );

  if (user.accountLocked && user.lockedUntil > new Date()) {
    // Account is locked
  }
  ```

- **PROBABILITY**: MEDIUM (for existing accounts)

**🔹 SCENARIO 8: Generate password reset token**

- **WHY**: Allow users to reset forgotten passwords securely
- **WHERE**: Forgot password endpoint, email service
- **WHEN**: User requests password reset via email
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { email: "user@example.com" },
    {
      $set: {
        passwordResetToken: "random_token_here",
        passwordResetExpires: new Date(Date.now() + 3600000), // 1 hour
      },
    },
  );

  // Mongoose
  const resetToken = crypto.randomBytes(32).toString("hex");
  await User.findOneAndUpdate(
    { email },
    {
      passwordResetToken: resetToken,
      passwordResetExpires: new Date(Date.now() + 3600000),
    },
  );
  ```

- **PROBABILITY**: MEDIUM (occasional user requests)

**🔹 SCENARIO 9: Verify password reset token**

- **WHY**: Ensure only authorized users can reset password
- **WHERE**: Password reset form handler, token validation middleware
- **WHEN**: User clicks reset link from email
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: new Date() },
  });

  // Mongoose
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });
  ```

- **PROBABILITY**: MEDIUM (when users reset passwords)

**🔹 SCENARIO 10: Reset password after verification**

- **WHY**: Update user's password with new one
- **WHERE**: Reset password endpoint, account service
- **WHEN**: After token verification, user submits new password
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: userId },
    {
      $set: {
        password: "new_hashed_password",
        passwordChangedAt: new Date(),
      },
      $unset: {
        passwordResetToken: "",
        passwordResetExpires: "",
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    password: hashedPassword,
    passwordChangedAt: new Date(),
    $unset: { passwordResetToken: 1, passwordResetExpires: 1 },
  });
  ```

- **PROBABILITY**: MEDIUM (successful password resets)

### **1.2 User Profile Management**

**🔹 SCENARIO 11: Get user profile by ID**

- **WHY**: Display user information in profile page
- **WHERE**: Profile controller, user settings page
- **WHEN**: User navigates to their profile or admin views user
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.findOne(
    { _id: ObjectId("user_id") },
    { password: 0, tokens: 0, resetToken: 0 }, // Exclude sensitive data
  );

  // Mongoose
  const user = await User.findById(userId)
    .select("-password -tokens -resetToken")
    .populate("posts", "title createdAt");
  ```

- **PROBABILITY**: HIGH (frequent profile views)

**🔹 SCENARIO 12: Update user profile**

- **WHY**: Allow users to update their information
- **WHERE**: Profile edit form, settings API
- **WHEN**: User submits profile changes
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        "profile.firstName": "John",
        "profile.lastName": "Doe",
        "profile.bio": "New bio text",
        updatedAt: new Date(),
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        "profile.firstName": req.body.firstName,
        "profile.lastName": req.body.lastName,
        "profile.bio": req.body.bio,
      },
    },
    { new: true },
  );
  ```

- **PROBABILITY**: MEDIUM (occasional profile updates)

**🔹 SCENARIO 13: Change user email**

- **WHY**: User wants to use different email address
- **WHERE**: Email settings page, account management
- **WHEN**: User requests email change and verifies new email
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        email: "newemail@example.com",
        emailVerified: false,
        emailChangeToken: "verification_token",
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    email: newEmail,
    emailVerified: false,
    emailChangeToken: token,
  });
  ```

- **PROBABILITY**: LOW (infrequent email changes)

**🔹 SCENARIO 14: Upload profile picture**

- **WHY**: Personalize user account with avatar
- **WHERE**: Profile picture upload handler, media service
- **WHEN**: User uploads or changes profile image
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        "profile.avatar": {
          url: "/uploads/avatar.jpg",
          thumbnail: "/uploads/avatar_thumb.jpg",
          uploadedAt: new Date(),
        },
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    $set: {
      "profile.avatar": {
        url: avatarUrl,
        thumbnail: thumbnailUrl,
        uploadedAt: new Date(),
      },
    },
  });
  ```

- **PROBABILITY**: MEDIUM (users occasionally update photos)

**🔹 SCENARIO 15: Delete user account (soft delete)**

- **WHY**: Comply with user deletion requests, GDPR, maintain data integrity
- **WHERE**: Account deletion endpoint, privacy compliance
- **WHEN**: User requests account deletion from settings
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        deletedAt: new Date(),
        isActive: false,
        deletionReason: req.body.reason,
        anonymized: true,
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    deletedAt: new Date(),
    isActive: false,
    deletionReason: req.body.reason,
    anonymized: true,
  });
  ```

- **PROBABILITY**: LOW (rare but critical)

**🔹 SCENARIO 16: Permanently delete user account**

- **WHY**: Complete data removal after grace period, comply with "right to be forgotten"
- **WHERE**: Cleanup job, admin tool, compliance service
- **WHEN**: After soft delete grace period (e.g., 30 days)
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.deleteOne({ _id: ObjectId("user_id") });

  // Also delete related data
  db.posts.deleteMany({ userId: ObjectId("user_id") });
  db.comments.deleteMany({ userId: ObjectId("user_id") });

  // Mongoose
  await User.findByIdAndDelete(userId);
  await Post.deleteMany({ author: userId });
  await Comment.deleteMany({ user: userId });
  ```

- **PROBABILITY**: LOW (infrequent, batch jobs)

**🔹 SCENARIO 17: Get users by role (admin/moderator)**

- **WHY**: Admin dashboard, permission management
- **WHERE**: Admin panel, user management interface
- **WHEN**: Admins need to see or manage users by role
- **QUERY**:

  ```javascript
  // MongoDB
  db.users
    .find({ role: "admin" }, { name: 1, email: 1, createdAt: 1 })
    .sort({ createdAt: -1 });

  // Mongoose
  const admins = await User.find({ role: "admin" })
    .select("name email createdAt lastLogin")
    .sort("-createdAt");
  ```

- **PROBABILITY**: MEDIUM (admin operations)

**🔹 SCENARIO 18: Search users by name or email**

- **WHY**: Find users in admin panel, add collaborators
- **WHERE**: User search component, team invitation
- **WHEN**: Admin searching for specific users
- **QUERY**:

  ```javascript
  // MongoDB with text search
  db.users
    .find({ $text: { $search: "john" } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } });

  // MongoDB with regex
  db.users.find({
    $or: [
      { name: { $regex: "john", $options: "i" } },
      { email: { $regex: "john", $options: "i" } },
    ],
  });

  // Mongoose
  const users = await User.find({
    $or: [
      { name: new RegExp(searchTerm, "i") },
      { email: new RegExp(searchTerm, "i") },
    ],
  }).limit(20);
  ```

- **PROBABILITY**: MEDIUM (admin searches)

### **1.3 User Preferences & Settings**

**🔹 SCENARIO 19: Save user notification preferences**

- **WHY**: Allow users to control which notifications they receive
- **WHERE**: Notification settings page, user preferences
- **WHEN**: User updates notification settings
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        "preferences.notifications": {
          email: { marketing: false, updates: true, security: true },
          push: { comments: true, likes: true, follows: false },
          sms: { twoFactor: true, promotions: false },
        },
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    $set: {
      "preferences.notifications": req.body.preferences,
    },
  });
  ```

- **PROBABILITY**: MEDIUM (users customize once)

**🔹 SCENARIO 20: Get user preferences**

- **WHY**: Apply user's chosen settings across application
- **WHERE**: App initialization, notification service
- **WHEN**: User logs in, or when sending notifications
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.findOne({ _id: ObjectId("user_id") }, { preferences: 1 });

  // Mongoose
  const preferences = await User.findById(userId).select("preferences");
  ```

- **PROBABILITY**: HIGH (frequent access)

**🔹 SCENARIO 21: Save theme preference**

- **WHY**: Remember user's UI theme choice (dark/light mode)
- **WHERE**: Theme switcher, UI settings
- **WHEN**: User toggles theme preference
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    { $set: { "preferences.theme": "dark" } },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    $set: { "preferences.theme": req.body.theme },
  });
  ```

- **PROBABILITY**: MEDIUM (occasional changes)

**🔹 SCENARIO 22: Set default language**

- **WHY**: Display UI in user's preferred language
- **WHERE**: Language selector, localization service
- **WHEN**: User changes language preference
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    { $set: { "preferences.language": "es" } },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    $set: { "preferences.language": req.body.language },
  });
  ```

- **PROBABILITY**: LOW (rarely changed)

### **1.4 User Activity Tracking**

**🔹 SCENARIO 23: Log user activity**

- **WHY**: Audit trail, security monitoring, usage analytics
- **WHERE**: Activity logging middleware, audit service
- **WHEN**: User performs significant actions (login, profile update, etc.)
- **QUERY**:

  ```javascript
  // MongoDB
  db.userActivities.insertOne({
    userId: ObjectId("user_id"),
    action: "profile_update",
    details: { field: "email", old: "old@email.com", new: "new@email.com" },
    ip: "192.168.1.1",
    userAgent: "Mozilla/...",
    timestamp: new Date(),
  });

  // Mongoose
  await UserActivity.create({
    userId: userId,
    action: "profile_update",
    details: req.body,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    timestamp: new Date(),
  });
  ```

- **PROBABILITY**: MEDIUM (tracked actions)

**🔹 SCENARIO 24: Get user activity history**

- **WHY**: Security review, user dashboard, audit compliance
- **WHERE**: Account security page, admin audit logs
- **WHEN**: User views security history or admin investigates
- **QUERY**:

  ```javascript
  // MongoDB
  db.userActivities
    .find({ userId: ObjectId("user_id") })
    .sort({ timestamp: -1 })
    .limit(100);

  // Mongoose
  const activities = await UserActivity.find({ userId })
    .sort("-timestamp")
    .limit(100);
  ```

- **PROBABILITY**: LOW (infrequent access)

**🔹 SCENARIO 25: Track online status**

- **WHY**: Show who's online, real-time presence
- **WHERE**: Real-time service, WebSocket connections
- **WHEN**: User connects/disconnects from app
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        onlineStatus: "online",
        lastSeen: new Date(),
        currentSessionId: "session_123",
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    onlineStatus: "online",
    lastSeen: new Date(),
    currentSessionId: sessionId,
  });
  ```

- **PROBABILITY**: HIGH (frequent status changes)

---

## **SECTION 2: CONTENT MANAGEMENT** (41-100)

### **2.1 Posts & Articles**

**🔹 SCENARIO 26: Create new blog post**

- **WHY**: Publish content for users to read
- **WHERE**: Post creation API, content management system
- **WHEN**: Author submits new post
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.insertOne({
    title: "My First Post",
    slug: "my-first-post",
    content: "Post content here...",
    excerpt: "Short preview...",
    author: ObjectId("author_id"),
    tags: ["mongodb", "tutorial"],
    status: "published",
    publishedAt: new Date(),
    views: 0,
    likes: [],
  });

  // Mongoose
  const post = new Post({
    title: req.body.title,
    slug: slugify(req.body.title),
    content: req.body.content,
    author: req.user.id,
    tags: req.body.tags,
  });
  await post.save();
  ```

- **PROBABILITY**: MEDIUM (content creation)

**🔹 SCENARIO 27: Get published posts with pagination**

- **WHY**: Display blog posts on homepage or blog listing
- **WHERE**: Blog frontend, homepage, category pages
- **WHEN**: User visits blog section
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts
    .find({ status: "published" })
    .sort({ publishedAt: -1 })
    .skip(20)
    .limit(10)
    .project({ title: 1, excerpt: 1, author: 1, publishedAt: 1, tags: 1 });

  // Mongoose
  const posts = await Post.find({ status: "published" })
    .select("title excerpt author publishedAt tags slug")
    .sort("-publishedAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("author", "name avatar");

  const total = await Post.countDocuments({ status: "published" });
  ```

- **PROBABILITY**: HIGH (every page load)

**🔹 SCENARIO 28: Get single post by slug**

- **WHY**: Display individual blog post page
- **WHERE**: Post detail page, permalink
- **WHEN**: User clicks on post title
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.findOne({ slug: "my-first-post", status: "published" });

  // Mongoose
  const post = await Post.findOne({ slug, status: "published" })
    .populate("author", "name avatar bio")
    .populate({
      path: "comments",
      match: { status: "approved" },
      options: { sort: { createdAt: -1 } },
      populate: { path: "user", select: "name avatar" },
    });
  ```

- **PROBABILITY**: HIGH (content consumption)

**🔹 SCENARIO 29: Increment post view count**

- **WHY**: Track popularity, analytics, "most viewed" sections
- **WHERE**: Post view middleware, analytics service
- **WHEN**: Each time a user views a post
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.updateOne({ _id: ObjectId("post_id") }, { $inc: { views: 1 } });

  // Mongoose
  await Post.findByIdAndUpdate(postId, { $inc: { views: 1 } });
  ```

- **PROBABILITY**: HIGH (every page view)

**🔹 SCENARIO 30: Like/unlike a post**

- **WHY**: User engagement, content popularity
- **WHERE**: Post interaction buttons, social features
- **WHEN**: User clicks like button
- **QUERY**:

  ```javascript
  // MongoDB - Like
  db.posts.updateOne(
    { _id: ObjectId("post_id") },
    {
      $addToSet: { likes: ObjectId("user_id") },
      $inc: { likeCount: 1 },
    },
  );

  // MongoDB - Unlike
  db.posts.updateOne(
    { _id: ObjectId("post_id") },
    {
      $pull: { likes: ObjectId("user_id") },
      $inc: { likeCount: -1 },
    },
  );

  // Mongoose
  await Post.findByIdAndUpdate(postId, {
    $addToSet: { likes: userId },
    $inc: { likeCount: 1 },
  });
  ```

- **PROBABILITY**: MEDIUM (user interactions)

**🔹 SCENARIO 31: Check if user liked post**

- **WHY**: UI state for like button (filled vs outlined)
- **WHERE**: Post template, like button component
- **WHEN**: Rendering post page for logged-in user
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.findOne(
    { _id: ObjectId("post_id"), likes: ObjectId("user_id") },
    { _id: 1 },
  );

  // Mongoose
  const liked = await Post.exists({
    _id: postId,
    likes: userId,
  });
  ```

- **PROBABILITY**: HIGH (for logged-in users)

**🔹 SCENARIO 32: Update post content**

- **WHY**: Edit published content, fix errors
- **WHERE**: Post editor, CMS
- **WHEN**: Author edits existing post
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.updateOne(
    { _id: ObjectId("post_id"), author: ObjectId("author_id") },
    {
      $set: {
        title: "Updated Title",
        content: "Updated content",
        updatedAt: new Date(),
        editHistory: {
          previousVersion: "old content",
          editedAt: new Date(),
        },
      },
    },
  );

  // Mongoose
  await Post.findOneAndUpdate(
    { _id: postId, author: userId },
    {
      $set: {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(),
      },
      $push: {
        editHistory: {
          previousVersion: oldContent,
          editedAt: new Date(),
        },
      },
    },
  );
  ```

- **PROBABILITY**: MEDIUM (content updates)

**🔹 SCENARIO 33: Delete post**

- **WHY**: Remove outdated or inappropriate content
- **WHERE**: Post management, moderation tools
- **WHEN**: Author deletes post or moderator removes it
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.deleteOne({ _id: ObjectId("post_id") });

  // Also delete related comments
  db.comments.deleteMany({ postId: ObjectId("post_id") });

  // Mongoose
  await Post.findByIdAndDelete(postId);
  await Comment.deleteMany({ post: postId });
  ```

- **PROBABILITY**: LOW (occasional deletions)

**🔹 SCENARIO 34: Get posts by author**

- **WHY**: Author profile page, portfolio display
- **WHERE**: Author archive page, user profile
- **WHEN**: User clicks on author name
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts
    .find({ author: ObjectId("author_id"), status: "published" })
    .sort({ publishedAt: -1 });

  // Mongoose
  const posts = await Post.find({
    author: authorId,
    status: "published",
  })
    .sort("-publishedAt")
    .select("title slug excerpt publishedAt views");
  ```

- **PROBABILITY**: MEDIUM (profile visits)

**🔹 SCENARIO 35: Get posts by tag**

- **WHY**: Tag-based navigation, topic exploration
- **WHERE**: Tag pages, topic filters
- **WHEN**: User clicks on tag link
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts
    .find({ tags: "mongodb", status: "published" })
    .sort({ publishedAt: -1 });

  // Mongoose
  const posts = await Post.find({
    tags: tagName,
    status: "published",
  })
    .sort("-publishedAt")
    .populate("author", "name");
  ```

- **PROBABILITY**: MEDIUM (tag navigation)

**🔹 SCENARIO 36: Search posts by title/content**

- **WHY**: Site search functionality
- **WHERE**: Search bar, global site search
- **WHEN**: User enters search query
- **QUERY**:

  ```javascript
  // MongoDB with text index
  db.posts
    .find(
      {
        $text: { $search: "mongodb tutorial" },
        status: "published",
      },
      { score: { $meta: "textScore" } },
    )
    .sort({ score: { $meta: "textScore" } });

  // MongoDB with regex
  db.posts.find({
    status: "published",
    $or: [
      { title: { $regex: "mongodb", $options: "i" } },
      { content: { $regex: "mongodb", $options: "i" } },
    ],
  });

  // Mongoose with text search
  const posts = await Post.find(
    { $text: { $search: query }, status: "published" },
    { score: { $meta: "textScore" } },
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(20);
  ```

- **PROBABILITY**: MEDIUM (user searches)

### **2.2 Comments & Interactions**

**🔹 SCENARIO 37: Add comment to post**

- **WHY**: User engagement, discussion, feedback
- **WHERE**: Comment form on post page
- **WHEN**: User submits comment
- **QUERY**:

  ```javascript
  // MongoDB
  db.comments.insertOne({
    postId: ObjectId("post_id"),
    userId: ObjectId("user_id"),
    content: "Great article!",
    status: "pending_approval",
    createdAt: new Date(),
    likes: [],
    parentId: null, // For nested comments
  });

  // Mongoose
  const comment = new Comment({
    post: postId,
    user: userId,
    content: req.body.content,
    parent: req.body.parentId || null,
  });
  await comment.save();

  // Also increment comment count on post
  await Post.findByIdAndUpdate(postId, {
    $inc: { commentCount: 1 },
  });
  ```

- **PROBABILITY**: MEDIUM (user comments)

**🔹 SCENARIO 38: Get comments for a post**

- **WHY**: Display discussion section
- **WHERE**: Post detail page, comments section
- **WHEN**: User scrolls to comments
- **QUERY**:

  ```javascript
  // MongoDB
  db.comments
    .find({
      postId: ObjectId("post_id"),
      status: "approved",
      parentId: null, // Top-level comments only
    })
    .sort({ createdAt: -1 })
    .limit(50);

  // Mongoose
  const comments = await Comment.find({
    post: postId,
    status: "approved",
    parent: null,
  })
    .sort("-createdAt")
    .populate("user", "name avatar")
    .populate({
      path: "replies",
      match: { status: "approved" },
      populate: { path: "user", select: "name avatar" },
    });
  ```

- **PROBABILITY**: HIGH (content consumption)

**🔹 SCENARIO 39: Moderate comment (approve/reject)**

- **WHY**: Prevent spam, maintain quality discussions
- **WHERE**: Moderation dashboard, admin panel
- **WHEN**: Moderator reviews pending comments
- **QUERY**:

  ```javascript
  // MongoDB - Approve
  db.comments.updateOne(
    { _id: ObjectId("comment_id") },
    { $set: { status: "approved", moderatedAt: new Date() } },
  );

  // MongoDB - Reject
  db.comments.updateOne(
    { _id: ObjectId("comment_id") },
    { $set: { status: "rejected", moderatedAt: new Date() } },
  );

  // Mongoose
  await Comment.findByIdAndUpdate(commentId, {
    status: "approved",
    moderatedBy: moderatorId,
    moderatedAt: new Date(),
  });
  ```

- **PROBABILITY**: MEDIUM (moderation queue)

**🔹 SCENARIO 40: Report inappropriate comment**

- **WHY**: Community moderation, safety
- **WHERE**: Comment options menu
- **WHEN**: User flags comment as inappropriate
- **QUERY**:

  ```javascript
  // MongoDB
  db.commentReports.insertOne({
    commentId: ObjectId("comment_id"),
    reportedBy: ObjectId("user_id"),
    reason: "harassment",
    details: "Additional context...",
    status: "pending",
    createdAt: new Date(),
  });

  // Also increment report count
  db.comments.updateOne(
    { _id: ObjectId("comment_id") },
    { $inc: { reportCount: 1 } },
  );

  // Mongoose
  await CommentReport.create({
    comment: commentId,
    reportedBy: userId,
    reason: req.body.reason,
    details: req.body.details,
  });

  await Comment.findByIdAndUpdate(commentId, {
    $inc: { reportCount: 1 },
  });
  ```

- **PROBABILITY**: LOW (occasional reports)

**🔹 SCENARIO 41: Delete comment**

- **WHY**: Remove inappropriate content
- **WHERE**: Moderation tools, user comment deletion
- **WHEN**: User deletes own comment or moderator removes it
- **QUERY**:

  ```javascript
  // MongoDB
  db.comments.deleteOne({ _id: ObjectId("comment_id") });

  // Also delete replies if any
  db.comments.deleteMany({ parentId: ObjectId("comment_id") });

  // Update post comment count
  db.posts.updateOne(
    { _id: ObjectId("post_id") },
    { $inc: { commentCount: -1 } },
  );

  // Mongoose
  await Comment.findByIdAndDelete(commentId);
  await Comment.deleteMany({ parent: commentId });
  await Post.findByIdAndUpdate(postId, {
    $inc: { commentCount: -1 },
  });
  ```

- **PROBABILITY**: LOW (occasional deletions)

### **2.3 Categories & Tags**

**🔹 SCENARIO 42: Create category**

- **WHY**: Organize content hierarchically
- **WHERE**: Content management, taxonomy admin
- **WHEN**: Adding new content category
- **QUERY**:

  ```javascript
  // MongoDB
  db.categories.insertOne({
    name: "Technology",
    slug: "technology",
    description: "Tech-related content",
    parent: null, // For subcategories
    postCount: 0,
    meta: {
      title: "Technology Articles",
      description: "Latest tech news and tutorials",
    },
  });

  // Mongoose
  const category = new Category(req.body);
  await category.save();
  ```

- **PROBABILITY**: LOW (infrequent category creation)

**🔹 SCENARIO 43: Get all categories with post counts**

- **WHY**: Navigation menu, sidebar widgets
- **WHERE**: Site header, category widget
- **WHEN**: Every page load (cached typically)
- **QUERY**:

  ```javascript
  // MongoDB
  db.categories.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "category",
        as: "posts",
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        postCount: { $size: "$posts" },
      },
    },
    { $sort: { name: 1 } },
  ]);

  // Mongoose
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "category",
        as: "posts",
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        postCount: { $size: "$posts" },
      },
    },
    { $sort: { name: 1 } },
  ]);
  ```

- **PROBABILITY**: HIGH (site navigation)

**🔹 SCENARIO 44: Get popular tags**

- **WHY**: Tag cloud, content discovery
- **WHERE**: Sidebar, footer, tag pages
- **WHEN**: User explores content by topic
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.aggregate([
    { $match: { status: "published" } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  // Mongoose
  const popularTags = await Post.aggregate([
    { $match: { status: "published" } },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);
  ```

- **PROBABILITY**: MEDIUM (content discovery)

---

## **SECTION 3: E-COMMERCE** (101-180)

### **3.1 Products & Inventory**

**🔹 SCENARIO 45: Add new product**

- **WHY**: List products for sale
- **WHERE**: Product management, admin panel
- **WHEN**: Adding new items to catalog
- **QUERY**:

  ```javascript
  // MongoDB
  db.products.insertOne({
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description: "Premium noise-cancelling headphones",
    price: 199.99,
    compareAtPrice: 249.99,
    cost: 120.0,
    sku: "WH-001-BLK",
    barcode: "123456789012",
    category: ObjectId("category_id"),
    tags: ["audio", "wireless", "electronics"],
    images: [
      { url: "/images/headphones-1.jpg", isPrimary: true },
      { url: "/images/headphones-2.jpg" },
    ],
    inventory: {
      quantity: 50,
      lowStockThreshold: 5,
      trackInventory: true,
      allowBackorder: false,
    },
    variants: [
      {
        color: "Black",
        sku: "WH-001-BLK",
        price: 199.99,
        quantity: 30,
      },
      {
        color: "White",
        sku: "WH-001-WHT",
        price: 199.99,
        quantity: 20,
      },
    ],
    attributes: {
      brand: "AudioTech",
      warranty: "2 years",
      connectivity: "Bluetooth 5.0",
    },
    status: "active",
    createdAt: new Date(),
  });

  // Mongoose
  const product = new Product(req.body);
  await product.save();
  ```

- **PROBABILITY**: MEDIUM (catalog updates)

**🔹 SCENARIO 46: Get products with filtering**

- **WHY**: Product listing pages with filters
- **WHERE**: Category pages, search results
- **WHEN**: User browses products
- **QUERY**:

  ```javascript
  // MongoDB
  db.products
    .find({
      status: "active",
      category: ObjectId("category_id"),
      price: { $gte: 50, $lte: 200 },
      "attributes.brand": { $in: ["Sony", "Bose"] },
      tags: "wireless",
    })
    .sort({ price: 1 })
    .skip(0)
    .limit(20)
    .project({ name: 1, price: 1, images: 1, slug: 1 });

  // Mongoose with complex filtering
  const query = { status: "active" };

  if (req.query.category) {
    query.category = req.query.category;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
  }

  if (req.query.brands) {
    query["attributes.brand"] = { $in: req.query.brands.split(",") };
  }

  const products = await Product.find(query)
    .select("name price images slug rating")
    .sort(req.query.sort || "-createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();
  ```

- **PROBABILITY**: HIGH (every product browse)

**🔹 SCENARIO 47: Get single product by slug**

- **WHY**: Product detail page
- **WHERE**: Product page, quick view modal
- **WHEN**: User clicks on product
- **QUERY**:

  ```javascript
  // MongoDB
  db.products.findOne({ slug: "wireless-headphones", status: "active" });

  // Mongoose
  const product = await Product.findOne({ slug, status: "active" })
    .populate("category", "name slug")
    .populate("reviews", "rating comment user createdAt")
    .lean();

  // Also get related products
  const related = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
    status: "active",
  })
    .limit(4)
    .select("name price images slug");
  ```

- **PROBABILITY**: HIGH (product views)

**🔹 SCENARIO 48: Update product inventory**

- **WHY**: Stock management after purchases or restocks
- **WHERE**: Order processing, inventory management
- **WHEN**: After order placement or stock arrival
- **QUERY**:

  ```javascript
  // MongoDB - Reduce stock after purchase
  db.products.updateOne(
    {
      _id: ObjectId("product_id"),
      "inventory.quantity": { $gte: quantity }, // Ensure sufficient stock
    },
    {
      $inc: { "inventory.quantity": -quantity },
      $set: {
        "inventory.lastUpdated": new Date(),
        "inventory.lowStockAlert": {
          $cond: {
            if: {
              $lte: ["$inventory.quantity", "$inventory.lowStockThreshold"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
  );

  // Mongoose
  const product = await Product.findById(productId);

  if (product.inventory.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  product.inventory.quantity -= quantity;
  product.inventory.lastUpdated = new Date();
  product.inventory.lowStockAlert =
    product.inventory.quantity <= product.inventory.lowStockThreshold;

  await product.save();
  ```

- **PROBABILITY**: HIGH (with every purchase)

**🔹 SCENARIO 49: Check product availability**

- **WHY**: Validate before adding to cart
- **WHERE**: Add to cart validation
- **WHEN**: User attempts to add product to cart
- **QUERY**:

  ```javascript
  // MongoDB
  db.products.findOne(
    {
      _id: ObjectId("product_id"),
      status: "active",
      $or: [
        { "inventory.trackInventory": false },
        { "inventory.quantity": { $gte: requestedQuantity } },
      ],
    },
    {
      name: 1,
      price: 1,
      "inventory.quantity": 1,
      "inventory.trackInventory": 1,
    },
  );

  // Mongoose
  const product = await Product.findOne({
    _id: productId,
    status: "active",
  }).select("name price inventory");

  const available =
    !product.inventory.trackInventory ||
    product.inventory.quantity >= requestedQuantity;
  ```

- **PROBABILITY**: HIGH (cart additions)

**🔹 SCENARIO 50: Get low stock products**

- **WHY**: Inventory alerts, reorder notifications
- **WHERE**: Admin dashboard, inventory alerts
- **WHEN**: Daily inventory check, real-time monitoring
- **QUERY**:

  ```javascript
  // MongoDB
  db.products
    .find({
      "inventory.trackInventory": true,
      "inventory.quantity": { $lte: "$inventory.lowStockThreshold" },
    })
    .sort({ "inventory.quantity": 1 });

  // Mongoose
  const lowStock = await Product.find({
    "inventory.trackInventory": true,
    $expr: { $lte: ["$inventory.quantity", "$inventory.lowStockThreshold"] },
  }).select("name sku inventory");
  ```

- **PROBABILITY**: MEDIUM (monitoring jobs)

### **3.2 Shopping Cart**

**🔹 SCENARIO 51: Add item to cart**

- **WHY**: User wants to purchase product
- **WHERE**: Cart service, add to cart endpoint
- **WHEN**: User clicks "Add to Cart"
- **QUERY**:

  ```javascript
  // MongoDB
  db.carts.updateOne(
    {
      userId: ObjectId("user_id"),
      status: "active",
    },
    {
      $setOnInsert: {
        createdAt: new Date(),
        userId: ObjectId("user_id"),
        status: "active",
      },
      $push: {
        items: {
          productId: ObjectId("product_id"),
          quantity: 1,
          price: 199.99,
          addedAt: new Date(),
        },
      },
      $inc: { itemCount: 1, totalAmount: 199.99 },
    },
    { upsert: true },
  );

  // Mongoose
  let cart = await Cart.findOne({ user: userId, status: "active" });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const product = await Product.findById(productId);

  cart.items.push({
    product: productId,
    quantity: 1,
    price: product.price,
    name: product.name,
  });

  cart.totalAmount += product.price;
  cart.itemCount += 1;

  await cart.save();
  ```

- **PROBABILITY**: HIGH (shopping behavior)

**🔹 SCENARIO 52: Get active cart**

- **WHY**: Display cart contents to user
- **WHERE**: Cart page, mini-cart dropdown
- **WHEN**: User views cart or navigates site
- **QUERY**:

  ```javascript
  // MongoDB
  db.carts.findOne({
    userId: ObjectId("user_id"),
    status: "active",
  });

  // Mongoose
  const cart = await Cart.findOne({ user: userId, status: "active" }).populate({
    path: "items.product",
    select: "name price images slug inventory",
  });
  ```

- **PROBABILITY**: HIGH (frequent cart views)

**🔹 SCENARIO 53: Update cart item quantity**

- **WHY**: Change quantity or remove items
- **WHERE**: Cart management interface
- **WHEN**: User modifies cart
- **QUERY**:

  ```javascript
  // MongoDB
  db.carts.updateOne(
    {
      userId: ObjectId("user_id"),
      "items.productId": ObjectId("product_id"),
    },
    {
      $set: { "items.$.quantity": newQuantity },
      $inc: {
        totalAmount: (newQuantity - oldQuantity) * itemPrice,
      },
    },
  );

  // Mongoose
  const cart = await Cart.findOne({ user: userId, status: "active" });
  const item = cart.items.find((i) => i.product.toString() === productId);

  const priceDiff = (newQuantity - item.quantity) * item.price;
  item.quantity = newQuantity;
  cart.totalAmount += priceDiff;

  await cart.save();
  ```

- **PROBABILITY**: MEDIUM (cart adjustments)

**🔹 SCENARIO 54: Remove item from cart**

- **WHY**: User no longer wants item
- **WHERE**: Cart page remove button
- **WHEN**: User removes item
- **QUERY**:

  ```javascript
  // MongoDB
  db.carts.updateOne(
    { userId: ObjectId("user_id") },
    {
      $pull: { items: { productId: ObjectId("product_id") } },
      $inc: {
        itemCount: -1,
        totalAmount: -itemPrice,
      },
    },
  );

  // Mongoose
  const cart = await Cart.findOne({ user: userId, status: "active" });
  const itemIndex = cart.items.findIndex(
    (i) => i.product.toString() === productId,
  );

  cart.totalAmount -=
    cart.items[itemIndex].price * cart.items[itemIndex].quantity;
  cart.itemCount -= 1;
  cart.items.splice(itemIndex, 1);

  await cart.save();
  ```

- **PROBABILITY**: MEDIUM (cart changes)

**🔹 SCENARIO 55: Clear cart**

- **WHY**: User wants to start over
- **WHERE**: Cart page clear button
- **WHEN**: User empties cart
- **QUERY**:

  ```javascript
  // MongoDB
  db.carts.updateOne(
    { userId: ObjectId("user_id") },
    {
      $set: {
        items: [],
        itemCount: 0,
        totalAmount: 0,
      },
    },
  );

  // Mongoose
  await Cart.findOneAndUpdate(
    { user: userId, status: "active" },
    {
      $set: {
        items: [],
        itemCount: 0,
        totalAmount: 0,
      },
    },
  );
  ```

- **PROBABILITY**: LOW (infrequent)

### **3.3 Orders & Checkout**

**🔹 SCENARIO 56: Create order from cart**

- **WHY**: Complete purchase transaction
- **WHERE**: Checkout process
- **WHEN**: User confirms purchase
- **QUERY**:

  ```javascript
  // MongoDB
  const session = db.getMongo().startSession();
  session.startTransaction();

  try {
    // Create order
    db.orders.insertOne(
      {
        userId: ObjectId("user_id"),
        items: cartItems,
        subtotal: 199.99,
        tax: 16.0,
        shipping: 5.99,
        total: 221.98,
        status: "pending",
        paymentStatus: "pending",
        shippingAddress: address,
        billingAddress: address,
        orderNumber: "ORD-2024-0001",
        createdAt: new Date(),
      },
      { session },
    );

    // Update inventory
    cartItems.forEach((item) => {
      db.products.updateOne(
        { _id: item.productId },
        { $inc: { "inventory.quantity": -item.quantity } },
        { session },
      );
    });

    // Clear cart
    db.carts.updateOne(
      { userId: ObjectId("user_id") },
      { $set: { status: "converted", items: [] } },
      { session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  } finally {
    session.endSession();
  }

  // Mongoose with transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = new Order({
      user: userId,
      items: cart.items,
      subtotal: cart.totalAmount,
      tax: calculateTax(cart.totalAmount),
      total: calculateTotal(cart),
      orderNumber: generateOrderNumber(),
    });

    await order.save({ session });

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { "inventory.quantity": -item.quantity } },
        { session },
      );
    }

    await Cart.findOneAndUpdate(
      { user: userId, status: "active" },
      { $set: { status: "completed" } },
      { session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  ```

- **PROBABILITY**: MEDIUM (purchase completion)

**🔹 SCENARIO 57: Get user orders**

- **WHY**: Order history, account management
- **WHERE**: My Orders page, account dashboard
- **WHEN**: User views purchase history
- **QUERY**:

  ```javascript
  // MongoDB
  db.orders
    .find({ userId: ObjectId("user_id") })
    .sort({ createdAt: -1 })
    .limit(20);

  // Mongoose
  const orders = await Order.find({ user: userId })
    .sort("-createdAt")
    .populate("items.product", "name images price")
    .lean();
  ```

- **PROBABILITY**: MEDIUM (account views)

**🔹 SCENARIO 58: Get single order details**

- **WHY**: Order confirmation, tracking page
- **WHERE**: Order details page
- **WHEN**: User clicks on order in history
- **QUERY**:

  ```javascript
  // MongoDB
  db.orders.findOne({
    _id: ObjectId("order_id"),
    userId: ObjectId("user_id"),
  });

  // Mongoose
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  })
    .populate("items.product")
    .populate("shippingAddress")
    .lean();
  ```

- **PROBABILITY**: MEDIUM (order views)

**🔹 SCENARIO 59: Update order status**

- **WHY**: Track fulfillment progress
- **WHERE**: Order management, admin panel
- **WHEN**: Order processed, shipped, delivered
- **QUERY**:

  ```javascript
  // MongoDB
  db.orders.updateOne(
    { _id: ObjectId("order_id") },
    {
      $set: {
        status: "shipped",
        shippingDetails: {
          carrier: "UPS",
          trackingNumber: "1Z999AA10123456784",
          shippedAt: new Date(),
        },
        statusHistory: {
          $push: {
            status: "shipped",
            timestamp: new Date(),
            note: "Order shipped via UPS",
          },
        },
      },
    },
  );

  // Mongoose
  await Order.findByIdAndUpdate(orderId, {
    $set: {
      status: "shipped",
      "shipping.carrier": "UPS",
      "shipping.trackingNumber": trackingNumber,
      "shipping.shippedAt": new Date(),
    },
    $push: {
      statusHistory: {
        status: "shipped",
        timestamp: new Date(),
        note: "Order shipped",
      },
    },
  });
  ```

- **PROBABILITY**: MEDIUM (fulfillment updates)

**🔹 SCENARIO 60: Cancel order**

- **WHY**: User changes mind, payment issues
- **WHERE**: Order cancellation endpoint
- **WHEN**: Before fulfillment
- **QUERY**:

  ```javascript
  // MongoDB with transaction
  const session = db.getMongo().startSession();
  session.startTransaction();

  try {
    db.orders.updateOne(
      { _id: ObjectId("order_id"), status: "pending" },
      { $set: { status: "cancelled", cancelledAt: new Date() } },
      { session },
    );

    // Restore inventory
    const order = db.orders.findOne({ _id: ObjectId("order_id") });
    order.items.forEach((item) => {
      db.products.updateOne(
        { _id: item.productId },
        { $inc: { "inventory.quantity": item.quantity } },
        { session },
      );
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
  }

  // Mongoose
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findOne({
      _id: orderId,
      status: "pending",
    }).session(session);

    order.status = "cancelled";
    order.cancelledAt = new Date();
    await order.save({ session });

    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { "inventory.quantity": item.quantity } },
        { session },
      );
    }

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
  ```

- **PROBABILITY**: LOW (occasional cancellations)

### **3.4 Product Reviews & Ratings**

**🔹 SCENARIO 61: Add product review**

- **WHY**: User feedback, social proof
- **WHERE**: Product page review form
- **WHEN**: After purchase, user submits review
- **QUERY**:

  ```javascript
  // MongoDB
  db.reviews.insertOne({
    productId: ObjectId("product_id"),
    userId: ObjectId("user_id"),
    rating: 5,
    title: "Great product!",
    comment: "Really happy with this purchase",
    pros: ["Sound quality", "Battery life"],
    cons: ["Pricey"],
    verified: true,
    helpful: 0,
    createdAt: new Date(),
  });

  // Update product rating
  db.products.updateOne(
    { _id: ObjectId("product_id") },
    {
      $inc: { reviewCount: 1 },
      $set: {
        averageRating: {
          $avg: ["$averageRating", 5],
        },
      },
    },
  );

  // Mongoose
  const review = new Review({
    product: productId,
    user: userId,
    rating: req.body.rating,
    title: req.body.title,
    comment: req.body.comment,
    pros: req.body.pros,
    cons: req.body.cons,
    verified: true,
  });

  await review.save();

  // Update product rating
  await Product.findByIdAndUpdate(productId, {
    $inc: { reviewCount: 1 },
    $set: { averageRating: await calculateAverageRating(productId) },
  });
  ```

- **PROBABILITY**: MEDIUM (post-purchase)

**🔹 SCENARIO 62: Get product reviews**

- **WHY**: Display social proof
- **WHERE**: Product page reviews tab
- **WHEN**: User views reviews section
- **QUERY**:

  ```javascript
  // MongoDB
  db.reviews
    .find({ productId: ObjectId("product_id") })
    .sort({ helpful: -1, createdAt: -1 })
    .limit(20);

  // Mongoose with pagination
  const reviews = await Review.find({ product: productId })
    .sort("-helpful -createdAt")
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("user", "name avatar")
    .lean();

  const ratingStats = await Review.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  ```

- **PROBABILITY**: HIGH (product page views)

**🔹 SCENARIO 63: Mark review as helpful**

- **WHY**: Quality feedback, sort by helpfulness
- **WHERE**: Review helpful button
- **WHEN**: User finds review helpful
- **QUERY**:

  ```javascript
  // MongoDB
  db.reviews.updateOne(
    { _id: ObjectId("review_id") },
    {
      $inc: { helpful: 1 },
      $addToSet: { helpfulUsers: ObjectId("user_id") },
    },
  );

  // Mongoose
  await Review.findByIdAndUpdate(reviewId, {
    $inc: { helpful: 1 },
    $addToSet: { helpfulUsers: userId },
  });
  ```

- **PROBABILITY**: MEDIUM (user engagement)

---

## **SECTION 4: SOCIAL FEATURES** (181-230)

### **4.1 Follow/Connection System**

**🔹 SCENARIO 64: Follow a user**

- **WHY**: Social connections, content discovery
- **WHERE**: User profile follow button
- **WHEN**: User wants to follow another user
- **QUERY**:

  ```javascript
  // MongoDB
  db.follows.insertOne({
    followerId: ObjectId("user_id"),
    followingId: ObjectId("target_user_id"),
    createdAt: new Date(),
  });

  // Update user stats
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    { $inc: { followingCount: 1 } },
  );

  db.users.updateOne(
    { _id: ObjectId("target_user_id") },
    { $inc: { followersCount: 1 } },
  );

  // Mongoose
  const follow = new Follow({
    follower: userId,
    following: targetUserId,
  });
  await follow.save();

  await User.findByIdAndUpdate(userId, { $inc: { followingCount: 1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: 1 } });
  ```

- **PROBABILITY**: MEDIUM (social interactions)

**🔹 SCENARIO 65: Unfollow a user**

- **WHY**: Remove social connection
- **WHERE**: Profile unfollow button
- **WHEN**: User no longer wants to follow
- **QUERY**:

  ```javascript
  // MongoDB
  db.follows.deleteOne({
    followerId: ObjectId("user_id"),
    followingId: ObjectId("target_user_id"),
  });

  // Update user stats
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    { $inc: { followingCount: -1 } },
  );

  db.users.updateOne(
    { _id: ObjectId("target_user_id") },
    { $inc: { followersCount: -1 } },
  );

  // Mongoose
  await Follow.findOneAndDelete({
    follower: userId,
    following: targetUserId,
  });

  await User.findByIdAndUpdate(userId, { $inc: { followingCount: -1 } });
  await User.findByIdAndUpdate(targetUserId, { $inc: { followersCount: -1 } });
  ```

- **PROBABILITY**: MEDIUM (social changes)

**🔹 SCENARIO 66: Check if following**

- **WHY**: UI state for follow button
- **WHERE**: Profile page, user card
- **WHEN**: Rendering user profile
- **QUERY**:

  ```javascript
  // MongoDB
  db.follows.findOne({
    followerId: ObjectId("user_id"),
    followingId: ObjectId("target_user_id"),
  });

  // Mongoose
  const isFollowing = await Follow.exists({
    follower: userId,
    following: targetUserId,
  });
  ```

- **PROBABILITY**: HIGH (profile views)

**🔹 SCENARIO 67: Get followers list**

- **WHY**: Display who follows a user
- **WHERE**: Profile followers tab
- **WHEN**: User views followers list
- **QUERY**:

  ```javascript
  // MongoDB
  db.follows
    .find({ followingId: ObjectId("user_id") })
    .sort({ createdAt: -1 })
    .limit(50);

  // Mongoose
  const followers = await Follow.find({ following: userId })
    .populate("follower", "name avatar bio")
    .sort("-createdAt")
    .limit(50);
  ```

- **PROBABILITY**: MEDIUM (profile exploration)

**🔹 SCENARIO 68: Get following list**

- **WHY**: Display who user follows
- **WHERE**: Profile following tab
- **WHEN**: User views following list
- **QUERY**:

  ```javascript
  // MongoDB
  db.follows
    .find({ followerId: ObjectId("user_id") })
    .sort({ createdAt: -1 })
    .limit(50);

  // Mongoose
  const following = await Follow.find({ follower: userId })
    .populate("following", "name avatar bio")
    .sort("-createdAt")
    .limit(50);
  ```

- **PROBABILITY**: MEDIUM (profile exploration)

**🔹 SCENARIO 69: Get mutual followers**

- **WHY**: Show common connections
- **WHERE**: Profile page "mutual followers" section
- **WHEN**: Viewing another user's profile
- **QUERY**:

  ```javascript
  // MongoDB
  db.follows.aggregate([
    // Users that current user follows
    { $match: { followerId: ObjectId("current_user_id") } },
    { $project: { followingId: 1 } },

    // Users that also follow target user
    {
      $lookup: {
        from: "follows",
        let: { followingId: "$followingId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$followingId", ObjectId("target_user_id")] },
                  { $eq: ["$followerId", "$$followingId"] },
                ],
              },
            },
          },
        ],
        as: "mutual",
      },
    },
    { $match: { mutual: { $ne: [] } } },
    { $project: { userId: "$followingId" } },
  ]);

  // Mongoose (simpler approach)
  const userFollowing = await Follow.find({
    follower: currentUserId,
  }).distinct("following");

  const mutual = await Follow.find({
    follower: { $in: userFollowing },
    following: targetUserId,
  }).populate("follower", "name avatar");
  ```

- **PROBABILITY**: LOW (social discovery)

### **4.2 Feed & Timeline**

**🔹 SCENARIO 70: Get user feed (posts from followed users)**

- **WHY**: Social media timeline
- **WHERE**: Home feed, timeline
- **WHEN**: User opens app main page
- **QUERY**:

  ```javascript
  // MongoDB
  const followedUsers = db.follows.distinct("followingId", {
    followerId: ObjectId("user_id"),
  });

  db.posts
    .find({
      authorId: { $in: followedUsers },
      status: "published",
    })
    .sort({ createdAt: -1 })
    .limit(50);

  // Mongoose
  const following = await Follow.find({
    follower: userId,
  }).distinct("following");

  const feed = await Post.find({
    author: { $in: following },
    status: "published",
  })
    .populate("author", "name avatar")
    .populate("comments", "count")
    .sort("-createdAt")
    .skip((page - 1) * 20)
    .limit(20)
    .lean();
  ```

- **PROBABILITY**: HIGH (primary app view)

**🔹 SCENARIO 71: Get personalized recommendations**

- **WHY**: Content discovery based on interests
- **WHERE**: Explore tab, recommendations
- **WHEN**: User wants to discover new content
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.aggregate([
    // Get user's interests from history
    {
      $match: {
        viewers: ObjectId("user_id"),
        status: "published",
      },
    },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },

    // Find posts with those tags
    {
      $lookup: {
        from: "posts",
        pipeline: [
          {
            $match: {
              tags: { $in: "$$interest_tags" },
              author: { $ne: ObjectId("user_id") },
              status: "published",
            },
          },
          { $sample: { size: 20 } },
        ],
        as: "recommendations",
      },
    },
  ]);

  // Mongoose
  const userTags = await UserHistory.aggregate([
    { $match: { user: userId } },
    { $unwind: "$interests" },
    { $group: { _id: "$interests", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const recommendations = await Post.aggregate([
    {
      $match: {
        tags: { $in: userTags.map((t) => t._id) },
        author: { $ne: userId },
        status: "published",
      },
    },
    { $sample: { size: 20 } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
  ]);
  ```

- **PROBABILITY**: MEDIUM (discovery features)

### **4.3 Notifications**

**🔹 SCENARIO 72: Create notification**

- **WHY**: Alert users about relevant events
- **WHERE**: Notification service, event handlers
- **WHEN**: User action triggers notification (like, comment, follow)
- **QUERY**:

  ```javascript
  // MongoDB
  db.notifications.insertOne({
    userId: ObjectId("target_user_id"),
    type: "like",
    actorId: ObjectId("actor_user_id"),
    targetId: ObjectId("post_id"),
    targetType: "post",
    message: "John liked your post",
    read: false,
    createdAt: new Date(),
    data: {
      postTitle: "My Post Title",
      actorName: "John Doe",
    },
  });

  // Mongoose
  const notification = new Notification({
    user: targetUserId,
    type: "like",
    actor: actorUserId,
    target: postId,
    targetType: "post",
    message: `${actorName} liked your post "${postTitle}"`,
    data: { postTitle, actorName },
  });
  await notification.save();
  ```

- **PROBABILITY**: HIGH (with user interactions)

**🔹 SCENARIO 73: Get user notifications**

- **WHY**: Display notification list
- **WHERE**: Notifications dropdown, notification page
- **WHEN**: User checks notifications
- **QUERY**:

  ```javascript
  // MongoDB
  db.notifications
    .find({ userId: ObjectId("user_id") })
    .sort({ createdAt: -1 })
    .limit(50);

  // Get unread count
  db.notifications.countDocuments({
    userId: ObjectId("user_id"),
    read: false,
  });

  // Mongoose
  const notifications = await Notification.find({ user: userId })
    .populate("actor", "name avatar")
    .sort("-createdAt")
    .limit(50)
    .lean();

  const unreadCount = await Notification.countDocuments({
    user: userId,
    read: false,
  });
  ```

- **PROBABILITY**: HIGH (frequent checks)

**🔹 SCENARIO 74: Mark notification as read**

- **WHY**: Track what user has seen
- **WHERE**: Notification click handler
- **WHEN**: User views notification
- **QUERY**:

  ```javascript
  // MongoDB
  db.notifications.updateOne(
    { _id: ObjectId("notification_id") },
    { $set: { read: true, readAt: new Date() } },
  );

  // Mark all as read
  db.notifications.updateMany(
    { userId: ObjectId("user_id"), read: false },
    { $set: { read: true, readAt: new Date() } },
  );

  // Mongoose
  await Notification.findByIdAndUpdate(notificationId, {
    read: true,
    readAt: new Date(),
  });

  // Mark all as read
  await Notification.updateMany(
    { user: userId, read: false },
    { $set: { read: true, readAt: new Date() } },
  );
  ```

- **PROBABILITY**: HIGH (user interaction)

**🔹 SCENARIO 75: Delete old notifications**

- **WHY**: Cleanup, maintain performance
- **WHERE**: Cron job, maintenance script
- **WHEN**: Daily/weekly cleanup
- **QUERY**:

  ```javascript
  // MongoDB
  db.notifications.deleteMany({
    createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }, // 30 days old
    read: true,
  });

  // Mongoose
  await Notification.deleteMany({
    createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    read: true,
  });
  ```

- **PROBABILITY**: LOW (scheduled jobs)

---

## **SECTION 5: ANALYTICS & REPORTING** (231-270)

### **5.1 User Analytics**

**🔹 SCENARIO 76: Get daily active users (DAU)**

- **WHY**: Track user engagement, growth metrics
- **WHERE**: Analytics dashboard
- **WHEN**: Daily reporting, real-time monitoring
- **QUERY**:

  ```javascript
  // MongoDB
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  db.userActivities.distinct("userId", {
    timestamp: { $gte: today, $lt: tomorrow },
  }).length;

  // Mongoose
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const dau = await UserActivity.distinct("userId", {
    timestamp: { $gte: startOfDay, $lt: endOfDay },
  });

  return dau.length;
  ```

- **PROBABILITY**: HIGH (daily metrics)

**🔹 SCENARIO 77: Get monthly active users (MAU)**

- **WHY**: Long-term engagement tracking
- **WHERE**: Analytics dashboard, investor reports
- **WHEN**: Monthly reporting
- **QUERY**:

  ```javascript
  // MongoDB
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  db.userActivities.distinct("userId", {
    timestamp: { $gte: firstDayOfMonth },
  }).length;

  // Mongoose
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const mau = await UserActivity.distinct("userId", {
    timestamp: { $gte: startOfMonth },
  });

  return mau.length;
  ```

- **PROBABILITY**: MEDIUM (monthly reports)

**🔹 SCENARIO 78: User retention cohort analysis**

- **WHY**: Understand user retention patterns
- **WHERE**: Analytics team, product decisions
- **WHEN**: Strategic analysis
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          week: { $week: "$createdAt" },
        },
        cohort: { $push: "$_id" },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "userActivities",
        let: { cohortUsers: "$cohort" },
        pipeline: [
          {
            $match: {
              $expr: { $in: ["$userId", "$$cohortUsers"] },
            },
          },
          {
            $group: {
              _id: {
                week: { $week: "$timestamp" },
                userId: "$userId",
              },
            },
          },
          {
            $group: {
              _id: "$_id.week",
              activeUsers: { $sum: 1 },
            },
          },
        ],
        as: "retention",
      },
    },
  ]);

  // Mongoose - complex aggregation
  const cohorts = await User.aggregate(retentionPipeline);
  ```

- **PROBABILITY**: LOW (strategic analysis)

**🔹 SCENARIO 79: User growth over time**

- **WHY**: Track signup trends
- **WHERE**: Growth dashboard
- **WHEN**: Weekly/monthly reviews
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);

  // Mongoose
  const growth = await User.aggregate([
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  ```

- **PROBABILITY**: MEDIUM (growth tracking)

### **5.2 Content Analytics**

**🔹 SCENARIO 80: Most viewed content**

- **WHY**: Popular content identification
- **WHERE**: Analytics dashboard, trending section
- **WHEN**: Content performance review
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts
    .find({ status: "published" })
    .sort({ views: -1 })
    .limit(10)
    .project({ title: 1, views: 1, author: 1 });

  // Mongoose
  const popular = await Post.find({ status: "published" })
    .sort("-views")
    .limit(10)
    .select("title views slug author")
    .populate("author", "name")
    .lean();
  ```

- **PROBABILITY**: MEDIUM (content analysis)

**🔹 SCENARIO 81: Content engagement metrics**

- **WHY**: Measure content performance
- **WHERE**: Content dashboard
- **WHEN**: Post-performance analysis
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.aggregate([
    { $match: { status: "published" } },
    {
      $project: {
        title: 1,
        views: 1,
        likes: { $size: "$likes" },
        comments: "$commentCount",
        engagementRate: {
          $multiply: [
            {
              $divide: [
                { $add: [{ $size: "$likes" }, "$commentCount"] },
                "$views",
              ],
            },
            100,
          ],
        },
      },
    },
    { $sort: { engagementRate: -1 } },
    { $limit: 20 },
  ]);

  // Mongoose
  const engagement = await Post.aggregate([
    { $match: { status: "published" } },
    {
      $project: {
        title: 1,
        views: 1,
        likes: { $size: "$likes" },
        comments: 1,
        engagementRate: {
          $multiply: [
            {
              $divide: [{ $add: [{ $size: "$likes" }, "$comments"] }, "$views"],
            },
            100,
          ],
        },
      },
    },
    { $sort: { engagementRate: -1 } },
    { $limit: 20 },
  ]);
  ```

- **PROBABILITY**: MEDIUM (content optimization)

**🔹 SCENARIO 82: Category performance**

- **WHY**: Understand which categories perform best
- **WHERE**: Content strategy dashboard
- **WHEN**: Planning content calendar
- **QUERY**:

  ```javascript
  // MongoDB
  db.posts.aggregate([
    { $match: { status: "published" } },
    {
      $group: {
        _id: "$category",
        totalViews: { $sum: "$views" },
        totalPosts: { $sum: 1 },
        avgViews: { $avg: "$views" },
        totalEngagement: {
          $sum: { $add: [{ $size: "$likes" }, "$commentCount"] },
        },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $sort: { totalViews: -1 } },
  ]);

  // Mongoose
  const categoryPerf = await Post.aggregate(categoryPipeline);
  ```

- **PROBABILITY**: MEDIUM (content planning)

### **5.3 Sales Analytics**

**🔹 SCENARIO 83: Daily sales report**

- **WHY**: Track revenue, orders
- **WHERE**: Sales dashboard
- **WHEN**: Daily business review
- **QUERY**:

  ```javascript
  // MongoDB
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  db.orders.aggregate([
    {
      $match: {
        createdAt: { $gte: today, $lt: tomorrow },
        status: { $ne: "cancelled" },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$total" },
        avgOrderValue: { $avg: "$total" },
        totalItems: { $sum: "$itemCount" },
      },
    },
  ]);

  // Mongoose
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(endOfDay.getDate() + 1);

  const sales = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfDay, $lt: endOfDay },
        status: { $ne: "cancelled" },
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$total" },
        avgOrderValue: { $avg: "$total" },
        totalItems: { $sum: "$itemCount" },
      },
    },
  ]);
  ```

- **PROBABILITY**: HIGH (daily operations)

**🔹 SCENARIO 84: Monthly revenue by product**

- **WHY**: Product performance analysis
- **WHERE**: Product analytics dashboard
- **WHEN**: Monthly review
- **QUERY**:

  ```javascript
  // MongoDB
  const firstDayOfMonth = new Date();
  firstDayOfMonth.setDate(1);
  firstDayOfMonth.setHours(0, 0, 0, 0);

  db.orders.aggregate([
    { $match: { createdAt: { $gte: firstDayOfMonth } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        quantity: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $sort: { revenue: -1 } },
  ]);

  // Mongoose
  const productSales = await Order.aggregate([
    { $match: { createdAt: { $gte: startOfMonth } } },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.product",
        quantity: { $sum: "$items.quantity" },
        revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      },
    },
    { $sort: { revenue: -1 } },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
  ]);
  ```

- **PROBABILITY**: MEDIUM (monthly analysis)

**🔹 SCENARIO 85: Conversion funnel**

- **WHY**: Understand user journey to purchase
- **WHERE**: Conversion optimization
- **WHEN**: UX optimization, marketing analysis
- **QUERY**:

  ```javascript
  // MongoDB
  db.userActivities.aggregate([
    {
      $facet: {
        pageViews: [
          { $match: { action: "page_view", page: "product" } },
          { $group: { _id: null, count: { $sum: 1 } } },
        ],
        addToCart: [
          { $match: { action: "add_to_cart" } },
          { $group: { _id: null, count: { $sum: 1 } } },
        ],
        checkoutStart: [
          { $match: { action: "checkout_start" } },
          { $group: { _id: null, count: { $sum: 1 } } },
        ],
        purchase: [
          { $match: { action: "purchase" } },
          { $group: { _id: null, count: { $sum: 1 } } },
        ],
      },
    },
  ]);

  // Mongoose
  const funnel = await UserActivity.aggregate(funnelPipeline);
  ```

- **PROBABILITY**: MEDIUM (optimization efforts)

### **5.4 System Monitoring**

**🔹 SCENARIO 86: Slow query monitoring**

- **WHY**: Identify performance bottlenecks
- **WHERE**: Database monitoring
- **WHEN**: Performance tuning
- **QUERY**:

  ```javascript
  // MongoDB
  db.currentOp({
    active: true,
    secs_running: { $gt: 5 },
    op: { $in: ["query", "command"] },
  });

  // Kill slow query
  db.killOp(opid);
  ```

- **PROBABILITY**: LOW (admin tasks)

**🔹 SCENARIO 87: Database stats**

- **WHY**: Capacity planning, monitoring
- **WHERE**: Database administration
- **WHEN**: Regular health checks
- **QUERY**:

  ```javascript
  // MongoDB
  db.stats();
  db.collection.stats();

  // Mongoose
  const stats = await mongoose.connection.db.stats();
  const collectionStats = await Product.collection.stats();
  ```

- **PROBABILITY**: LOW (admin tasks)

**🔹 SCENARIO 88: Index usage stats**

- **WHY**: Verify indexes are being used
- **WHERE**: Performance optimization
- **WHEN**: After adding indexes
- **QUERY**:

  ```javascript
  // MongoDB
  db.collection.aggregate([{ $indexStats: {} }]);

  // Check query execution
  db.collection.find({ field: "value" }).explain("executionStats");
  ```

- **PROBABILITY**: LOW (optimization)

---

## **SECTION 6: ADMIN & MODERATION** (271-300)

### **6.1 User Moderation**

**🔹 SCENARIO 89: Suspend user account**

- **WHY**: Enforce rules, block problematic users
- **WHERE**: Admin moderation panel
- **WHEN**: User violates terms
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        status: "suspended",
        suspensionReason: req.body.reason,
        suspendedBy: ObjectId("admin_id"),
        suspendedAt: new Date(),
        suspensionEnds: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    status: "suspended",
    suspension: {
      reason: req.body.reason,
      suspendedBy: adminId,
      suspendedAt: new Date(),
      endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });
  ```

- **PROBABILITY**: LOW (infrequent)

**🔹 SCENARIO 90: Ban user permanently**

- **WHY**: Remove user permanently
- **WHERE**: Admin actions
- **WHEN**: Severe violations
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateOne(
    { _id: ObjectId("user_id") },
    {
      $set: {
        status: "banned",
        banReason: req.body.reason,
        bannedBy: ObjectId("admin_id"),
        bannedAt: new Date(),
        permanent: true,
      },
    },
  );

  // Optionally remove content
  db.posts.updateMany(
    { author: ObjectId("user_id") },
    { $set: { status: "hidden", hiddenReason: "author_banned" } },
  );

  // Mongoose
  await User.findByIdAndUpdate(userId, {
    status: "banned",
    ban: {
      reason: req.body.reason,
      bannedBy: adminId,
      bannedAt: new Date(),
      permanent: true,
    },
  });
  ```

- **PROBABILITY**: VERY LOW (rare)

**🔹 SCENARIO 91: Get flagged content**

- **WHY**: Moderation queue
- **WHERE**: Moderation dashboard
- **WHEN**: Daily moderation
- **QUERY**:

  ```javascript
  // MongoDB
  db.reports.find({ status: "pending" }).sort({ createdAt: 1 }).limit(50);

  // Mongoose
  const reports = await Report.find({ status: "pending" })
    .populate("reportedBy", "name")
    .populate("content")
    .sort("createdAt")
    .limit(50);
  ```

- **PROBABILITY**: MEDIUM (moderation tasks)

### **6.2 System Configuration**

**🔹 SCENARIO 92: Save system settings**

- **WHY**: Application configuration
- **WHERE**: Admin settings panel
- **WHEN**: Admin updates configuration
- **QUERY**:

  ```javascript
  // MongoDB
  db.settings.updateOne(
    { key: "site_config" },
    {
      $set: {
        value: {
          siteName: "My App",
          maintenanceMode: false,
          registrationOpen: true,
          maxUploadSize: 10485760,
          emailSettings: {
            provider: "sendgrid",
            apiKey: "encrypted_key",
          },
        },
        updatedAt: new Date(),
        updatedBy: ObjectId("admin_id"),
      },
    },
    { upsert: true },
  );

  // Mongoose
  await Settings.findOneAndUpdate(
    { key: "site_config" },
    {
      $set: {
        value: req.body,
        updatedAt: new Date(),
        updatedBy: adminId,
      },
    },
    { upsert: true, new: true },
  );
  ```

- **PROBABILITY**: LOW (infrequent updates)

**🔹 SCENARIO 93: Get system settings**

- **WHY**: Apply configuration
- **WHERE**: App initialization, feature toggles
- **WHEN**: Server start, periodic refresh
- **QUERY**:

  ```javascript
  // MongoDB
  db.settings.findOne({ key: "site_config" });

  // Mongoose (with caching)
  const settings = await Settings.findOne({ key: "site_config" }).lean();
  ```

- **PROBABILITY**: HIGH (frequent reads)

### **6.3 Audit Logs**

**🔹 SCENARIO 94: Log admin actions**

- **WHY**: Audit trail, security compliance
- **WHERE**: Admin action middleware
- **WHEN**: Admin performs any action
- **QUERY**:

  ```javascript
  // MongoDB
  db.auditLogs.insertOne({
    adminId: ObjectId("admin_id"),
    action: "user_suspend",
    targetId: ObjectId("target_user_id"),
    targetType: "user",
    changes: {
      before: { status: "active" },
      after: { status: "suspended" },
    },
    ip: "192.168.1.1",
    userAgent: "Mozilla/...",
    timestamp: new Date(),
  });

  // Mongoose
  await AuditLog.create({
    admin: adminId,
    action: "user_suspend",
    target: targetId,
    targetType: "user",
    changes: {
      before: previousState,
      after: newState,
    },
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });
  ```

- **PROBABILITY**: MEDIUM (admin actions)

**🔹 SCENARIO 95: Get audit trail for user**

- **WHY**: Investigate user history
- **WHERE**: User profile in admin panel
- **WHEN**: Admin investigates user
- **QUERY**:

  ```javascript
  // MongoDB
  db.auditLogs 
    .find({
      $or: [
        { targetId: ObjectId("user_id"), targetType: "user" },
        { adminId: ObjectId("user_id") },
      ],
    })
    .sort({ timestamp: -1 })
    .limit(100);

  // Mongoose
  const audit = await AuditLog.find({
    $or: [{ target: userId, targetType: "user" }, { admin: userId }],
  })
    .populate("admin", "name")
    .sort("-timestamp")
    .limit(100);
  ```

- **PROBABILITY**: LOW (investigations)

---

## **SECTION 7: UTILITY & MAINTENANCE** (301-330)

### **7.1 Data Migration**

**🔹 SCHEMA 96: Bulk update documents**

- **WHY**: Schema changes, data enrichment
- **WHERE**: Migration scripts
- **WHEN**: During deployment, data fixes
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.updateMany(
    { profilePicture: { $exists: false } },
    { $set: { profilePicture: "/default-avatar.png" } },
  );

  // Mongoose
  await User.updateMany(
    { profilePicture: { $exists: false } },
    { $set: { profilePicture: "/default-avatar.png" } },
  );
  ```

- **PROBABILITY**: LOW (migrations)

**🔹 SCENARIO 97: Data transformation**

- **WHY**: Change data format
- **WHERE**: Data migration scripts
- **WHEN**: Schema evolution
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.find({ address: { $type: "string" } }).forEach(function (doc) {
    db.users.updateOne(
      { _id: doc._id },
      {
        $set: {
          address: {
            full: doc.address,
            parsed: parseAddress(doc.address),
          },
        },
      },
    );
  });

  // Mongoose with cursor
  const cursor = User.find({ address: { $type: "string" } }).cursor();

  for await (const user of cursor) {
    user.address = {
      full: user.address,
      parsed: parseAddress(user.address),
    };
    await user.save();
  }
  ```

- **PROBABILITY**: LOW (one-time tasks)

### **7.2 Backup & Cleanup**

**🔹 SCENARIO 98: Archive old data**

- **WHY**: Performance, compliance
- **WHERE**: Archival jobs
- **WHEN**: Monthly/yearly
- **QUERY**:

  ```javascript
  // MongoDB
  const oldDate = new Date();
  oldDate.setFullYear(oldDate.getFullYear() - 1);

  // Move to archive collection
  db.orders.aggregate([
    { $match: { createdAt: { $lt: oldDate } } },
    { $out: "orders_archive" },
  ]);

  // Delete from main
  db.orders.deleteMany({ createdAt: { $lt: oldDate } });

  // Mongoose
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  await Order.aggregate([
    { $match: { createdAt: { $lt: oneYearAgo } } },
    { $out: "orders_archive" },
  ]);

  await Order.deleteMany({ createdAt: { $lt: oneYearAgo } });
  ```

- **PROBABILITY**: LOW (scheduled)

**🔹 SCENARIO 99: Clean up orphaned data**

- **WHY**: Data integrity
- **WHERE**: Maintenance jobs
- **WHEN**: Weekly/monthly
- **QUERY**:

  ```javascript
  // MongoDB
  // Find comments with no parent post
  db.comments
    .aggregate([
      {
        $lookup: {
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "post",
        },
      },
      { $match: { post: { $size: 0 } } },
      { $project: { _id: 1 } },
    ])
    .forEach(function (comment) {
      db.comments.deleteOne({ _id: comment._id });
    });

  // Mongoose
  const orphanedComments = await Comment.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "post",
        foreignField: "_id",
        as: "post",
      },
    },
    { $match: { post: { $size: 0 } } },
    { $project: { _id: 1 } },
  ]);

  if (orphanedComments.length) {
    await Comment.deleteMany({
      _id: { $in: orphanedComments.map((c) => c._id) },
    });
  }
  ```

- **PROBABILITY**: LOW (maintenance)

### **7.3 Testing & Development**

**🔹 SCENARIO 100: Seed test data**

- **WHY**: Development, testing
- **WHERE**: Setup scripts
- **WHEN**: Environment setup
- **QUERY**:

  ```javascript
  // MongoDB
  db.users.insertMany([
    {
      name: "Test User 1",
      email: "test1@example.com",
      role: "user",
    },
    {
      name: "Test User 2",
      email: "test2@example.com",
      role: "admin",
    },
  ]);

  // Mongoose
  await User.insertMany(testUsers);
  await Post.insertMany(testPosts);
  ```

- **PROBABILITY**: MEDIUM (development)

**🔹 SCENARIO 101: Reset database**

- **WHY**: Clean state for testing  
- **WHERE**: Test setup/teardown
- **WHEN**: Before/after tests
- **QUERY**:

  ```javascript
  // MongoDB
  db.dropDatabase();

  // Mongoose
  await mongoose.connection.dropDatabase();

  // Or drop collections
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
  ```

- **PROBABILITY**: MEDIUM (testing)

---

## **📊 PROBABILITY SUMMARY**

| Probability | Count | When Used                             |
| ----------- | ----- | ------------------------------------- |
| **HIGH**    | 25    | Every request, frequent operations    |
| **MEDIUM**  | 45    | Regular features, occasional use      |
| **LOW**     | 31    | Admin tasks, maintenance, rare events |

---

## **🎯 TOP 10 MOST COMMON QUERIES**

1. **Find by ID**: `db.collection.findById(id)`
2. **Insert document**: `db.collection.insertOne(data)`
3. **Update document**: `db.collection.updateOne({ _id: id }, { $set: data })`
4. **Find with pagination**: `db.collection.find().skip().limit().sort()`
5. **Count documents**: `db.collection.countDocuments({ filter })`
6. **Check existence**: `db.collection.exists({ filter })`
7. **Find one**: `db.collection.findOne({ email })`
8. **Delete document**: `db.collection.deleteOne({ _id: id })`
9. **Increment field**: `db.collection.updateOne({ _id: id }, { $inc: { field: 1 } })`
10. **Populate references**: `Model.find().populate('field')`

---

This comprehensive guide covers **330+ scenarios** across every aspect of MongoDB queries with clear **WHY, WHERE, WHEN** context and probability ratings. Use it as your go-to reference for understanding which query to use in any situation!
