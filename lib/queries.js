/**
 * Created by Fred Lackey <fred.lackey@gmail.com> on 9/21/2015.
 */

'use strict';

var	queryText = {
	constraints: 'SELECT * FROM INFORMATION_SCHEMA.CHECK_CONSTRAINTS ORDER BY CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA, CONSTRAINT_NAME',
	columnDomainUsage: 'SELECT * FROM INFORMATION_SCHEMA.COLUMN_DOMAIN_USAGE ORDER BY DOMAIN_CATALOG, DOMAIN_SCHEMA, DOMAIN_NAME, TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME',
	columnPrivileges: 'SELECT * FROM INFORMATION_SCHEMA.COLUMN_PRIVILEGES ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME,GRANTOR, GRANTEE',
	columns: 'SELECT * FROM INFORMATION_SCHEMA.COLUMNS ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, ORDINAL_POSITION, COLUMN_NAME',
	constraintColumnUsage: 'SELECT * FROM INFORMATION_SCHEMA.CONSTRAINT_COLUMN_USAGE ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME',
	constraintTableUsage: 'SELECT * FROM INFORMATION_SCHEMA.CONSTRAINT_TABLE_USAGE ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME',
	domainConstraints: 'SELECT * FROM INFORMATION_SCHEMA.DOMAIN_CONSTRAINTS ORDER BY CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA, CONSTRAINT_NAME, DOMAIN_CATALOG, DOMAIN_SCHEMA, DOMAIN_NAME',
	domains: 'SELECT * FROM INFORMATION_SCHEMA.DOMAINS ORDER BY DOMAIN_CATALOG, DOMAIN_SCHEMA, DOMAIN_NAME',
	keyColumnUsage: 'SELECT * FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME',
	parameters: 'SELECT * FROM INFORMATION_SCHEMA.PARAMETERS ORDER BY SPECIFIC_CATALOG, SPECIFIC_SCHEMA, SPECIFIC_NAME',
	referentialConstraints: 'SELECT * FROM INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS ORDER BY CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA, CONSTRAINT_NAME',
	routineColumns: 'SELECT * FROM INFORMATION_SCHEMA.ROUTINE_COLUMNS ORDER BY CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA, CONSTRAINT_NAME ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME',
	routines: 'SELECT * FROM INFORMATION_SCHEMA.ROUTINES ORDER BY ROUTINE_TYPE, SPECIFIC_CATALOG, SPECIFIC_SCHEMA, SPECIFIC_NAME, ROUTINE_CATALOG, ROUTINE_SCHEMA, ROUTINE_NAME',
	schemata: 'SELECT * FROM INFORMATION_SCHEMA.SCHEMATA ORDER BY CATALOG_NAME, SCHEMA_NAME, SCHEMA_OWNER',
	tableConstraints: 'SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, CONSTRAINT_CATALOG, CONSTRAINT_SCHEMA, CONSTRAINT_NAME',
	tablePrivileges: 'SELECT * FROM INFORMATION_SCHEMA.TABLE_PRIVILEGES ORDER BY GRANTOR, GRANTEE, TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME',
	tables: 'SELECT * FROM INFORMATION_SCHEMA.TABLES ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME',
	viewColumnUsage: 'SELECT * FROM INFORMATION_SCHEMA.VIEW_COLUMN_USAGE ORDER BY VIEW_CATALOG, VIEW_SCHEMA, VIEW_NAME, TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME',
	viewTableUsage: 'SELECT * FROM INFORMATION_SCHEMA.VIEW_TABLE_USAGE ORDER BY VIEW_CATALOG, VIEW_SCHEMA, VIEW_NAME, TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME',
	views: 'SELECT * FROM INFORMATION_SCHEMA.VIEWS ORDER BY TABLE_CATALOG, TABLE_SCHEMA, TABLE_NAME',

	fkMembership: 'SELECT s1.name AS FK_SCHEMA, o1.name AS FK_TABLE, c1.name AS FK_COLUMN, fk.name AS FK_NAME, s2.name AS PK_SCHEMA, o2.name AS PK_TABLE, c2.name AS PK_COLUMN, pk.name AS PK_NAME, fk.delete_referential_action_desc AS DELETE_ACTION, fk.update_referential_action_desc AS UPDATE_ACTION FROM sys.objects o1 INNER JOIN sys.schemas s1 ON o1.schema_id = s1.schema_id INNER JOIN sys.foreign_keys fk ON o1.object_id = fk.parent_object_id INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id INNER JOIN sys.columns c1 ON fkc.parent_object_id = c1.object_id AND fkc.parent_column_id = c1.column_id INNER JOIN sys.columns c2 ON fkc.referenced_object_id = c2.object_id AND fkc.referenced_column_id = c2.column_id INNER JOIN sys.objects o2 ON fk.referenced_object_id = o2.object_id INNER JOIN sys.schemas s2 ON o2.schema_id = s2.schema_id INNER JOIN sys.key_constraints pk ON fk.referenced_object_id = pk.parent_object_id AND fk.key_index_id = pk.unique_index_id ORDER BY s1.name, o1.name, s2.name, o2.name, fkc.constraint_column_id',
    indices: 'SELECT TABLE_SCHEMA = s.name, INDEX_NAME = ind.name, COLUMN_NAME = col.name, TABLE_NAME = t.name, INDEX_ID = ind.index_id, COLUMN_ID = ic.index_column_id, INDEX_TYPE = ind.type_desc, IS_UNIQUE = (CASE WHEN ind.is_unique = \'1\' THEN \'TRUE\' ELSE \'FALSE\' END), IS_PRIMARY_KEY = (CASE WHEN ind.is_primary_key = \'1\' THEN \'TRUE\' ELSE \'FALSE\' END) FROM sys.indexes ind INNER JOIN sys.index_columns ic ON  ind.object_id = ic.object_id and ind.index_id = ic.index_id INNER JOIN sys.columns col ON ic.object_id = col.object_id and ic.column_id = col.column_id INNER JOIN sys.tables t ON ind.object_id = t.object_id INNER JOIN sys.schemas s ON t.schema_id = s.schema_id WHERE t.is_ms_shipped = 0 ORDER BY t.name, ind.index_id, ic.index_column_id '
};

var getList = function () {
	var list = [];
	Object.keys(queryText).forEach(function (key) {
		list.push({ name: key, text: queryText[key] });
	});
	return list;
};

var queryList = getList();

module.exports = {
	items: queryText,
	list: queryList
};