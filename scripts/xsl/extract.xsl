<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:gps="http://www.topografix.com/GPX/1/1" xmlns="http://www.topografix.com/GPX/1/1" version="1.0">
  <xsl:output method="text" indent="no" />
    
	<xsl:template match="@* | node()">
		<xsl:apply-templates select="@* | node()"/>
    </xsl:template>
	
  <xsl:template match="gps:trkpt[1]">
	<xsl:value-of select="@lat"/><xsl:text> , </xsl:text><xsl:value-of select="@lon"/><xsl:text>
	</xsl:text>
  </xsl:template>

</xsl:stylesheet>