<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gps="http://www.topografix.com/GPX/1/1" xmlns="http://www.topografix.com/GPX/1/1" version="1.0">
  <xsl:output method="xml" indent="yes" />
    
	<xsl:template match="@* | node()">
        <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy>
    </xsl:template>
	
  <xsl:template match="gps:trkseg">
	<xsl:element name="trkseg">
		<xsl:for-each select="gps:trkpt">
			<xsl:sort select="position()" data-type="number" order="descending"/>
			<xsl:copy>
				<xsl:apply-templates select="@* | node()"/>
			</xsl:copy>
		</xsl:for-each>
	</xsl:element>
  </xsl:template>

  <xsl:template match="gps:name">
	<xsl:element name="name">Žilinské hrady</xsl:element>
  </xsl:template>

  <xsl:template match="gps:metadata">
  </xsl:template>

</xsl:stylesheet>